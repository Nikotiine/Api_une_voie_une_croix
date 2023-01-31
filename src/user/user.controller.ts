import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserProfileDto } from './dto/UserProfile.dto';
import { UserRegisterDto } from './dto/UserRegister.dto';

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
    return this.userService.createUser(userRegisterDto);
  }

  @Put()
  @ApiCreatedResponse({
    description: 'The user has been successfully updated',
    type: UserProfileDto,
  })
  public async editUser(user: any): Promise<UserProfileDto> {
    return this.userService.edit(user);
  }
}
