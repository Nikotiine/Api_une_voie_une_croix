import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateSiteDto } from './dto/CreateSite.dto';
import { SiteService } from './site.service';
import { SiteDataDto } from './dto/SiteData.dto';
import { SiteListDto } from './dto/SiteList.dto';
import { SiteViewDto } from './dto/SiteView.dto';

@Controller('api/site')
@ApiTags('Site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}
  @Post()
  @ApiCreatedResponse({
    type: SiteListDto,
    description: 'Create new site',
  })
  public createSite(
    @Body() createSiteDto: CreateSiteDto,
  ): Promise<SiteListDto> {
    return this.siteService.create(createSiteDto);
  }
  @Get()
  @ApiCreatedResponse({
    type: [SiteListDto],
    description: 'Return all sites',
  })
  public async getAllSites(): Promise<SiteListDto[]> {
    return this.siteService.findAll();
  }
  @Get('one/:id')
  @ApiCreatedResponse({
    type: SiteViewDto,
    description: 'get resource site',
  })
  public async getSite(@Param('id') id: number): Promise<SiteViewDto> {
    console.log('ici');
    return this.siteService.findOneById(id);
  }

  @Get('data')
  @ApiCreatedResponse({
    type: SiteDataDto,
    description: 'Return all data for create a new site',
  })
  public async getData(): Promise<SiteDataDto> {
    return this.siteService.getAllData();
  }
}
