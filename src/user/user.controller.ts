import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserProfileDto } from './dto/UserProfile.dto';
import { UserRegisterDto } from './dto/UserRegister.dto';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {}
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
}
