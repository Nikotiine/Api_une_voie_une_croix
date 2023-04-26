import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ApiMessage } from '../../enum/ApiMessage.enum';
import { SectorDto } from '../../dto/Sector.dto';
import { SectorService } from './sector.service';

@Controller('api/Sector')
@ApiTags('Sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Get('site/:id')
  @ApiParam({
    name: 'id',
    description: 'id of the site',
    allowEmptyValue: false,
  })
  @ApiCreatedResponse({
    type: [SectorDto],
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'SectorDto',
  })
  @ApiOperation({
    summary: 'Get Sectors',
    description: 'Return all Sector filtered by site.id ',
  })
  public async getSectorBySite(
    @Param('id') siteId: number,
  ): Promise<SectorDto[]> {
    return this.sectorService.findSectorsBySite(siteId);
  }
}
