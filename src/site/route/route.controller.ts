import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

@Controller('api/route')
@ApiTags('Route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}
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
    type: RouteListDto,
    description:
      'The Description for the Post Body. Please look into the DTO RouteListDto',
  })
  @ApiOperation({
    summary: 'get route resource',
    description: 'find route resource by id',
  })
  public async getRoute(@Param('id') id: number): Promise<RouteListDto> {
    return this.routeService.findById(id);
  }
}
