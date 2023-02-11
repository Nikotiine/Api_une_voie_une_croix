import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSiteDto } from './dto/CreateSite.dto';
import { SiteService } from './site.service';

@Controller('api/site')
@ApiTags('Site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}
  @Post()
  public createSite(@Body() createSiteDto: CreateSiteDto) {
    console.log(createSiteDto);
    return this.siteService.create(createSiteDto);
  }
}
