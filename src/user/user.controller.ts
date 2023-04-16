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
    description:
      'In case of success => return UserProfileDto, Please look into the DTO UserRegisterDto ',
    type: UserProfileDto,
  })
  @ApiOperation({
    summary: 'Register new user',
    description:
      'Create new user in database / by default the user have role USER',
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
    description:
      'In case of success => return updated UserProfileDto, Please look into the DTO UserRegisterDto',
    type: UserProfileDto,
  })
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of user',
  })
  @ApiOperation({
    summary: 'Edit user profile',
    description: 'The user can edit his profile / JWT required',
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
    description: 'Get user profile',
    type: UserProfileDto,
  })
  @ApiOperation({
    summary: 'Get user resource by id',
    description: 'The user can show his own profile',
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
      'Return all contribution of user, Please look into dto , UserContributionDto',
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
