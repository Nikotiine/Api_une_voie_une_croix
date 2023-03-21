import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SiteCreateDto } from '../../dto/SiteCreate.dto';
import { SiteService } from './site.service';
import { SiteListDto } from '../../dto/SiteList.dto';
import { SiteViewDto } from '../../dto/SiteView.dto';
import { SiteRouteDto } from '../../dto/SiteRoute.dto';
import { isNumber } from 'class-validator';

@Controller('api/site')
@ApiTags('Site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  // ********** POST OPERATION *************
  @Post()
  @ApiOperation({
    summary: 'Create site resource',
    description: 'Entry point for create new site resource',
  })
  @ApiBody({
    type: SiteCreateDto,
    description:
      'The Description for the Post Body. Please look into the DTO SiteCreateDto',
  })
  @ApiCreatedResponse({
    type: SiteListDto,
    description: 'Return the new site resource',
  })
  public async createSite(
    @Body() siteCreateDto: SiteCreateDto,
  ): Promise<SiteListDto> {
    return this.siteService.create(siteCreateDto);
  }
  // ********** GET OPERATIONS *************
  @Get()
  @ApiOperation({
    summary: 'Get all sites resources',
    description: 'Entry point for get all sites resources with many datas',
  })
  @ApiCreatedResponse({
    type: [SiteListDto],
    description:
      'Return collection of sites resource. Please look into the DTO SiteListDto',
  })
  public async getAllSites(): Promise<SiteListDto[]> {
    return this.siteService.findAll();
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Get one site resource',
    description: 'Entry point for get a site resource',
  })
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of site resource',
  })
  @ApiCreatedResponse({
    type: SiteViewDto,
    description: 'Return site resource',
  })
  public async getSite(@Param('id') id: number): Promise<SiteViewDto> {
    return this.siteService.findOneById(id);
  }

  @Get('route/:id')
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of site resource',
  })
  @ApiOperation({
    summary: 'Get routes site resource',
    description: 'Entry point for get a site resource',
  })
  @ApiCreatedResponse({
    type: [SiteRouteDto],
    description: 'Return site resource',
  })
  public async getRoutesOfSite(
    @Param('id') id: number,
  ): Promise<SiteRouteDto[]> {
    return this.siteService.findRoutes(id);
  }
  // ********** PUT OPERATION *************
  @Put(':id')
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of site resource',
  })
  @ApiBody({
    type: SiteCreateDto,
    description:
      'The Description for the Post Body. Please look into the DTO SiteCreateDto',
  })
  @ApiCreatedResponse({
    type: SiteViewDto,
    description: 'Return the update data with SiteViewDto',
  })
  @ApiOperation({
    summary: 'Edit site resource',
    description: 'Entry point for edit site resource',
  })
  public async editSite(
    @Param('id') id: number,
    @Body() site: SiteCreateDto,
  ): Promise<SiteViewDto> {
    return this.siteService.update(id, site);
  }
  // ********** DELETE OPERATION *************
}
