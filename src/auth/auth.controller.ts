import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialsDto } from '../user/dto/UserCredentials.dto';
import { AuthService } from './auth.service';
import { UserProfileDto } from '../user/dto/UserProfile.dto';
import { UserRegisterDto } from '../user/dto/UserRegister.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({
    description: 'login path',
  })
  @Post('login')
  login(@Body() credential: UserCredentialsDto) {
    return this.authService.login(credential);
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
