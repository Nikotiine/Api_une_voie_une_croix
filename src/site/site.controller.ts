import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SiteCreateDto } from './dto/SiteCreate.dto';
import { SiteService } from './site.service';
import { SiteDataDto } from './dto/SiteData.dto';
import { SiteListDto } from './dto/SiteList.dto';
import { SiteViewDto } from './dto/SiteView.dto';

@Controller('api/site')
@ApiTags('Site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}
  @Post()
  @ApiOperation({
    summary: 'Create site resource',
    description: 'Mettre la description',
  })
  @ApiBody({
    type: SiteCreateDto,
    description:
      'The Description for the Post Body. Please look into the DTO SiteCreateDto',
  })
  @ApiCreatedResponse({
    type: SiteListDto,
    description: 'Return new site resource',
  })
  public createSite(
    @Body() siteCreateDto: SiteCreateDto,
  ): Promise<SiteListDto> {
    return this.siteService.create(siteCreateDto);
  }
  @Get()
  @ApiOperation({
    summary: 'Get all site resource',
    description: 'Mettre la description',
  })
  @ApiCreatedResponse({
    type: [SiteListDto],
    description: 'Return collection of sites resource',
  })
  public async getAllSites(): Promise<SiteListDto[]> {
    return this.siteService.findAll();
  }
  @Get('one/:id')
  @ApiOperation({
    summary: 'Get one site resource',
    description: 'Mettre la description',
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

  @Get('data')
  @ApiOperation({
    summary: 'Get data for create site resource',
    description: 'Returns all the data necessary for the creation of a site ',
  })
  @ApiCreatedResponse({
    type: SiteDataDto,
    description: 'Return all data . Please look into the DTO SiteDataDto',
  })
  public async getData(): Promise<SiteDataDto> {
    return this.siteService.getAllData();
  }

  @Put('edit/:id')
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
  public async editSite(
    @Param('id') id: number,
    @Body() site: SiteCreateDto,
  ): Promise<SiteViewDto> {
    return this.siteService.update(id, site);
  }
}
