import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateSiteDto } from './dto/CreateSite.dto';
import { SiteService } from './site.service';
import { SiteDataDto } from './dto/SiteData.dto';
import { SiteListDto } from './dto/SiteList.dto';

@Controller('api/site')
@ApiTags('Site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}
  @Post()
  public createSite(@Body() createSiteDto: CreateSiteDto) {
    return this.siteService.create(createSiteDto);
  }
  @Get()
  @ApiCreatedResponse({
    type: [SiteListDto],
    description: 'Return all site aviable',
  })
  public async getAllSites(): Promise<SiteListDto[]> {
    return this.siteService.findAll();
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
