import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
import { RouteService } from './route.service';
import { RouteCreateDto } from '../../dto/RouteCreate.dto';
import { RouteListDto } from '../../dto/RouteList.dto';

import { SiteService } from '../site/site.service';
import { SiteDto } from '../../dto/Site.dto';
import { RouteViewDto } from '../../dto/RouteView.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';

@Controller('api/route')
@ApiTags('Route')
export class RouteController {
  constructor(
    private readonly routeService: RouteService,
    private readonly siteService: SiteService,
  ) {}
  // ********** POST OPERATION *************

  /**
   * Ajout d'une nouvelle voie sur un site / JWT required
   * @param req Json web token
   * @param routeCreate RouteCreateDto
   */
  @Post()
  @ApiOperation({
    summary: 'Create route resource',
    description: 'Add new route for a site',
  })
  @ApiBody({
    type: RouteCreateDto,
    description:
      'The Description for the Post Body. Please look into the DTO RouteCreateDto',
  })
  @ApiCreatedResponse({
    type: RouteListDto,
    description:
      'The Description for the Post Body. Please look into the DTO RouteListDto',
  })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  public async createRoute(
    @Request() req,
    @Body() routeCreate: RouteCreateDto,
  ): Promise<RouteListDto> {
    return this.routeService.create(routeCreate);
  }

  // ********** PUT OPERATION *************
  /**
   * Editition d'une voie / JWT required
   * @param req Json web token
   * @param id de la voie
   * @param route RouteCreateDto
   */
  @Put(':id')
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of the route',
  })
  @ApiBody({
    type: RouteCreateDto,
    description:
      'The Description for the Post Body. Please look into the DTO RouteCreateDto',
  })
  @ApiOperation({
    summary: 'Create route resource',
    description: 'Add new route for a site',
  })
  @ApiCreatedResponse({
    type: RouteViewDto,
    description:
      'The Description for the Post Body. Please look into the DTO RouteViewDto',
  })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  public async editRoute(
    @Request() req,
    @Param('id') id: number,
    @Body() route: RouteCreateDto,
  ): Promise<RouteViewDto> {
    return this.routeService.update(id, route);
  }
  // ********** PUT OPERATION *************

  /**
   * Methode publique / recupere la liste de toutes les voies actives
   */
  @Get()
  @ApiOperation({
    summary: 'get all route resource',
    description: 'Find all routes in all sites',
  })
  @ApiCreatedResponse({
    type: [RouteListDto],
    description:
      'The Description for the Post Body. Please look into the DTO RouteListDto',
  })
  public async getAllRoutes(): Promise<RouteListDto[]> {
    return this.routeService.findAll();
  }

  /**
   * Methode publique / renvoie les info de la voie
   * @param id de la voie
   */
  @Get(':id')
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of the route',
  })
  @ApiCreatedResponse({
    type: RouteViewDto,
    description:
      'The Description for the Post Body. Please look into the DTO RouteViewDto',
  })
  @ApiOperation({
    summary: 'get route resource',
    description: 'find route resource by id',
  })
  public async getRoute(@Param('id') id: number): Promise<RouteViewDto> {
    return this.routeService.findById(id);
  }

  /**
   * Methode publique , renvoie la liste des site actif pour la selection du site la de la creation d'une voie
   */
  @Get('site/list')
  @ApiCreatedResponse({
    type: [SiteDto],
    description:
      'Return array of site resource,Please look into the DTO SiteDto',
  })
  @ApiOperation({
    summary: 'Entry point to get sites resource',
    description: 'Get all sites resource with minimum necesary datas',
  })
  public async getSites(): Promise<SiteDto[]> {
    return this.siteService.findAllForRoute();
  }
}
