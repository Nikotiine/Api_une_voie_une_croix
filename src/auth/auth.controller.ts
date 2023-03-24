import {
  Request,
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserProfileDto } from '../dto/UserProfile.dto';

import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { TokenDto } from '../dto/Token.dto';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';
import { UserCredentialsDto } from '../dto/UserCredentials.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    description: "Point d'entree de la connexion",
    summary: 'login path',
  })
  @ApiCreatedResponse({
    description: 'return access token',
    type: TokenDto,
  })
  @ApiBody({
    type: UserCredentialsDto,
    description:
      'The Description for the Post Body. Please look into the DTO UserCredentialDto',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body() credential: UserCredentialsDto,
  ): Promise<TokenDto> {
    return this.authService.generateToken(req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Jwt authentifacation',
    description: "Point d'entree pour l'autentification du token",
  })
  @ApiCreatedResponse({
    description: 'The access token is validate',
    type: UserProfileDto,
  })
  async me(@Request() req): Promise<UserProfileDto> {
    return this.authService.getProfile(parseInt(req.user.id));
  }
}
