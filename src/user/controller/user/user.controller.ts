import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../../dto/User.dto';
import { UserService } from '../../service/user/user.service';
import { UserRegisterDto } from '../../dto/UserRegister.dto';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiOperation({
    description: 'Register new user',
  })
  createUser(@Body() userRegisterDto: UserRegisterDto): Promise<UserDto> {
    return this.userService.createUser(userRegisterDto);
  }
}
