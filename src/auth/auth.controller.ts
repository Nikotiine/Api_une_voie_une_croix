import {
  Request,
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserProfileDto } from '../user/dto/UserProfile.dto';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { TokenDto } from './dto/Token.dto';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';
import { UserCredentialsDto } from './dto/UserCredentials.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    description: 'login path',
  })
  @ApiCreatedResponse({
    description: 'return access token',
    type: TokenDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body() crendential: UserCredentialsDto,
  ): Promise<TokenDto> {
    return this.authService.generateToken(req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiCreatedResponse({
    description: 'The access token is validate',
    type: UserProfileDto,
  })
  async me(@Request() req): Promise<UserProfileDto> {
    return this.authService.getProfile(parseInt(req.user.id));
  }
}
