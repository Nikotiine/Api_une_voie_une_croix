import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialsDto } from './dto/UserCredentials.dto';
import { AuthService } from './auth.service';
import { UserProfileDto } from '../user/dto/UserProfile.dto';
import { UserRegisterDto } from '../user/dto/UserRegister.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenDto } from './dto/Token.dto';

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
  @Post('login')
  login(@Body() credential: UserCredentialsDto): Promise<TokenDto> {
    return this.authService.validateUser(credential);
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
}
