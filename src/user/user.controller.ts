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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserProfileDto } from '../dto/UserProfile.dto';
import { UserRegisterDto } from '../dto/UserRegister.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { UserEditPasswordDto } from '../dto/UserEditPassword.dto';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserProfileDto,
  })
  @ApiOperation({
    summary: 'Register new user',
    description: 'Mettre la description',
  })
  @ApiBody({
    type: UserRegisterDto,
    description:
      'The Description for the Post Body. Please look into the DTO UserRegisterDto',
  })
  public async createUser(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserProfileDto> {
    return this.userService.create(userRegisterDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiCreatedResponse({
    description: 'The user has been successfully updated',
    type: UserProfileDto,
  })
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of user',
  })
  @ApiOperation({
    summary: 'Edit user resource',
    description: 'Mettre la description',
  })
  @ApiBody({
    type: UserRegisterDto,
    description:
      'The Description for the Post Body. Please look into the DTO UserRegisterDto',
  })
  public async editUser(
    @Request() req,
    @Param('id') id: number,
    @Body() user: UserRegisterDto,
  ): Promise<void | UserProfileDto> {
    if (req.user.id === id) {
      return this.userService.edit(id, user);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get collection of users resource',
    description: 'PLease look into the dto UserProfileDto',
  })
  @ApiCreatedResponse({
    type: [UserProfileDto],
  })
  public async getAllUsers(): Promise<UserProfileDto[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiCreatedResponse({
    description: 'Get user profile',
    type: UserProfileDto,
  })
  @ApiOperation({
    summary: 'Get user resource',
    description: 'Mettre la description',
  })
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of user',
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
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of user',
  })
  @ApiCreatedResponse({
    description: 'edit password',
    type: UserProfileDto,
  })
  @ApiOperation({
    summary: 'Edit user password resource',
    description: 'Mettre la description',
  })
  @ApiBody({
    type: UserEditPasswordDto,
    description:
      'The Description for the Post Body. Please look into the DTO UserRegisterDto',
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
