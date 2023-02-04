import {
  Body,
  Controller,
  Get,
  Param,
  Request,
  Post,
  Put,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserProfileDto } from './dto/UserProfile.dto';
import { UserRegisterDto } from './dto/UserRegister.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/strategy/local-auth.guard';
import { UserEditPasswordDto } from './dto/UserEditPassword.dto';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserProfileDto,
  })
  async createUser(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserProfileDto> {
    return this.userService.create(userRegisterDto);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'The user has been successfully updated',
    type: UserProfileDto,
  })
  public async editUser(
    @Param('id') id: number,
    @Body() user: UserRegisterDto,
  ): Promise<void | UserProfileDto> {
    return this.userService.edit(id, user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiCreatedResponse({
    description: 'Get user profile',
    type: UserProfileDto,
  })
  public async getUser(
    @Request() req,
    @Param('id') id: number,
  ): Promise<UserProfileDto> {
    if (req.user.id === id) {
      return this.userService.findById(id);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Put('password/:id')
  @ApiCreatedResponse({
    description: 'edit password',
    type: UserProfileDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  public async editUserPassword(
    @Request() req,
    @Param('id') id: number,
    @Body() passwords: UserEditPasswordDto,
  ): Promise<void | UserProfileDto> {
    if (req.user.id === id) {
      return this.userService.editPassword(id, passwords);
    } else {
      throw new UnauthorizedException();
    }
  }
}
