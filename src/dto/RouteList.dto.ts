import { ApiProperty } from '@nestjs/swagger';
import { LevelDto } from './Level.dto';

import { RouteDto } from './Route.dto';
import { SectorSiteDto } from './SectorSite.dto';
import { ExpositionDto } from './Exposition.dto';

export class RouteListDto extends RouteDto {
  @ApiProperty({
    example: 33,
  })
  height: number;

  @ApiProperty({
    type: LevelDto,
  })
  level: LevelDto;

  @ApiProperty({
    type: SectorSiteDto,
  })
  sector: SectorSiteDto;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty({
    type: ExpositionDto,
  })
  exposition: ExpositionDto;
}
