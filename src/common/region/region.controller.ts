import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RegionService } from './region.service';

import { RegionDto } from '../../dto/Region.dto';

@Controller('api/region')
@ApiTags('Region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all regions resource',
    description: 'Mettre la description',
  })
  @ApiCreatedResponse({
    type: [RegionDto],
    description: 'Return collection of region resource',
  })
  public async getAllRegions(): Promise<RegionDto[]> {
    return this.regionService.findAll();
  }
}
