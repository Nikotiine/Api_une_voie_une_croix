import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AdminUsersDto } from '../dto/AdminUsers.dto';
import { AdminSitesDto } from '../dto/AdminSites.dto';
import { AdminRoutesDto } from '../dto/AdminRoutes.dto';
import { Roles } from '../decorator/roles.decorator';
import { UserRole } from '../enum/UserRole.enum';
import { RolesGuard } from '../auth/strategy/roles.guard';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { UpdateResponse } from '../dto/UpdateResponse.dto';

@Controller('api/admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @Roles(UserRole.ROLE_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Get collection users resouces',
    description: 'Mettre une descrption',
  })
  @ApiCreatedResponse({
    type: [AdminUsersDto],
    description: 'Please look into dto , AdminUserDto',
  })
  public async getAllUsers(@Request() req): Promise<AdminUsersDto[]> {
    return this.adminService.findAllUsers();
  }

  @Put('users/role/:id')
  @ApiParam({
    name: 'id',
    description: 'id of user',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Edit user role',
    description: 'Mettre une descfitpion',
  })
  @ApiCreatedResponse({
    type: UpdateResponse,
    description: 'a mettre',
  })
  @ApiBody({
    type: AdminUsersDto,
  })
  public async editUserRole(
    @Request() req,
    @Param('id') id: number,
    @Body() user: AdminUsersDto,
  ): Promise<UpdateResponse> {
    return this.adminService.changeUserRole(id, user);
  }

  @Patch('users/:id')
  @Roles(UserRole.ROLE_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Toggle user status',
    description: 'Mettre une descfitpion',
  })
  @ApiCreatedResponse({
    type: UpdateResponse,
    description: 'a mettre',
  })
  @ApiParam({
    name: 'id',
    description: 'id of user',
  })
  public async toggleUserStatus(
    @Request() req,
    @Param('id') id: number,
  ): Promise<UpdateResponse> {
    return this.adminService.toggleUserStatus(id);
  }
  @Get('sites')
  @Roles(UserRole.ROLE_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Get collection sites resouces',
    description: 'Mettre une descrption',
  })
  @ApiCreatedResponse({
    type: [AdminSitesDto],
    description: 'Please look into dto , AdminSitesDto',
  })
  public async getAllSites(@Request() req): Promise<AdminSitesDto[]> {
    return this.adminService.findAllSites();
  }

  @Patch('sites/:id')
  @Roles(UserRole.ROLE_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Toggle site status',
    description: 'Mettre une descfitpion',
  })
  @ApiCreatedResponse({
    type: UpdateResponse,
    description: 'a mettre',
  })
  @ApiParam({
    name: 'id',
    description: 'id of site',
  })
  public async toggleSiteStatus(
    @Request() req,
    @Param('id') id: number,
  ): Promise<UpdateResponse> {
    return this.adminService.toggleSiteStatus(id);
  }
  @Get('routes')
  @Roles(UserRole.ROLE_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Get collection routes resouces',
    description: 'Mettre une descrption',
  })
  @ApiCreatedResponse({
    type: [AdminRoutesDto],
    description: 'Please look into dto , AdminSitesDto',
  })
  public async getAllRoutes(@Request() req): Promise<AdminRoutesDto[]> {
    return this.adminService.findAllRoutes();
  }
  @Patch('routes/:id')
  @Roles(UserRole.ROLE_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Toggle route status',
    description: 'Mettre une descfitpion',
  })
  @ApiCreatedResponse({
    type: UpdateResponse,
    description: 'a mettre',
  })
  @ApiParam({
    name: 'id',
    description: 'id of site',
  })
  public async toggleRouteStatus(
    @Request() req,
    @Param('id') id: number,
  ): Promise<UpdateResponse> {
    return this.adminService.toggleRouteStatus(id);
  }
}
