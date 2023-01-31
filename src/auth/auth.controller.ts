import {
  Body,
  Request,
  Controller,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserProfileDto } from '../user/dto/UserProfile.dto';
import { UserRegisterDto } from '../user/dto/UserRegister.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TokenDto } from './dto/Token.dto';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({
    description: 'login path',
  })
  @ApiCreatedResponse({
    description: 'return access token',
    type: TokenDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<TokenDto> {
    return this.authService.generateToken(req.user);
  }
  @Post('register')
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserProfileDto,
  })
  createUser(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserProfileDto> {
    return this.authService.register(userRegisterDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @ApiHeader({
    name: 'Authorization: Bearer',
  })
  @ApiCreatedResponse({
    description: 'The access token is validate',
    type: UserProfileDto,
  })
  async me(@Request() req): Promise<UserProfileDto> {
    return this.authService.getProfile(parseInt(req.user.id));
  }
}
