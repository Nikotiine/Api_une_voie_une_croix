import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RouteService } from './route.service';
import { RouteCreateDto } from '../../dto/RouteCreate.dto';
import { RouteListDto } from '../../dto/RouteList.dto';

import { SiteService } from '../site/site.service';
import { SiteDto } from '../../dto/Site.dto';
import { RouteViewDto } from '../../dto/RouteView.dto';

@Controller('api/route')
@ApiTags('Route')
export class RouteController {
  constructor(
    private readonly routeService: RouteService,
    private readonly siteService: SiteService,
  ) {}
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
  public async createRoute(
    @Body() routeCreate: RouteCreateDto,
  ): Promise<RouteListDto> {
    return this.routeService.create(routeCreate);
  }

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
  public async editRoute(
    @Param('id') id: number,
    @Body() route: RouteCreateDto,
  ): Promise<RouteViewDto> {
    return this.routeService.update(id, route);
  }
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
