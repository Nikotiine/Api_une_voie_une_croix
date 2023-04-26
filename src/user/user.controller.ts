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
import { UserContributionDto } from '../dto/UserContribution.dto';
import { ApiMessage } from '../enum/ApiMessage.enum';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creation d'un nouvel utilisateur
   * @param userRegisterDto
   */
  @Post('register')
  @ApiCreatedResponse({
    type: UserProfileDto,
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'UserProfileDto',
  })
  @ApiOperation({
    summary: 'Register new user',
    description:
      'Entry point to post new user -> by default the role is UserRole.USER',
  })
  @ApiBody({
    type: UserRegisterDto,
    description: ApiMessage.BODY_DESCRIPTION + 'UserRegisterDto',
  })
  public async createUser(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserProfileDto> {
    return this.userService.create(userRegisterDto);
  }

  /**
   * Editiion du profile utilisateur
   * @param req json web token
   * @param id de l'utilisateur
   * @param user UserCreateDto
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiCreatedResponse({
    type: UserProfileDto,
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'UserProfileDto',
  })
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of user',
  })
  @ApiOperation({
    summary: 'Edit user profile',
    description: 'Entry point to edit user profile',
  })
  @ApiBody({
    type: UserRegisterDto,
    description: ApiMessage.BODY_DESCRIPTION + 'UserRegisterDto',
  })
  public async editUser(
    @Request() req,
    @Param('id') id: number,
    @Body() user: UserRegisterDto,
  ): Promise<void | UserProfileDto> {
    if (req.user.id === id) {
      return this.userService.edit(id, user);
    } else {
      // Si le token est invalide retroune une erreur 403
      throw new UnauthorizedException();
    }
  }

  /**
   * Recupere le prodfil de l'utilisateur
   * Si l'id du token ne correspond pas a celui passer en parametre => renvoie une 403
   * @param req Json web token
   * @param id de l'utilisateur
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiCreatedResponse({
    type: UserProfileDto,
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'UserProfileDto',
  })
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Return user profile find by id ',
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

  /**
   * Renvoie toute les contribution de l'utlisateur
   * Ajout de site / voies / topo
   * @param req Json web token / required
   * @param id de l'utilisateur
   */
  @Get('contribution/:id')
  @ApiOperation({
    summary: 'Get user contributions',
    description: 'Retrieve all contributions of user (site/route/topo)',
  })
  @ApiCreatedResponse({
    type: UserContributionDto,
    description:
      ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'UserContributionDto',
  })
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of user',
  })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  public async getUserContributions(
    @Request() req,
    @Param('id') id: number,
  ): Promise<UserContributionDto> {
    if (req.user.id === id) {
      return this.userService.findContributions(id);
    } else {
      throw new UnauthorizedException();
    }
  }
  //TODO:Modifier cette route
  @Put('password/:id')
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of user',
  })
  @ApiCreatedResponse({
    type: UserProfileDto,
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'UserProfileDto',
  })
  @ApiOperation({
    summary: 'Edit user password resource',
    description: 'Mettre la description',
  })
  @ApiBody({
    type: UserEditPasswordDto,
    description: ApiMessage.BODY_DESCRIPTION + 'UserEditPasswordDto',
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
