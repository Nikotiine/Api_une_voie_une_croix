import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DataSiteDto } from '../dto/DataSite.dto';
import { CommonService } from './common.service';
import { DataRouteDto } from '../dto/DataRoute.dto';

@Controller('api/common')
@ApiTags('Common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}
  @Get('data/site')
  @ApiCreatedResponse({
    type: DataSiteDto,
  })
  @ApiOperation({
    summary: 'Data for site',
    description: 'descrpitoin',
  })
  public async getDataForSite(): Promise<DataSiteDto> {
    return this.commonService.findDataForSite();
  }

  @Get('data/route')
  @ApiCreatedResponse({
    type: DataRouteDto,
  })
  @ApiOperation({
    summary: 'Data for route',
    description: 'descrptit',
  })
  public async getDataForRoute(): Promise<DataRouteDto> {
    return this.commonService.findDataForRoute();
  }
}
