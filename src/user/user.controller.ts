import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
  @ApiCreatedResponse({
    description: 'Get user profile',
    type: UserProfileDto,
  })
  public async getUser(@Param('id') id: number): Promise<UserProfileDto> {
    return this.userService.findById(id);
  }
}
