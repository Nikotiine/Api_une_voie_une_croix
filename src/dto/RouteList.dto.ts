import { ApiProperty } from '@nestjs/swagger';
import { LevelDto } from './Level.dto';

import { RouteDto } from './Route.dto';
import { SecteurSiteDto } from './SecteurSite.dto';
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
    type: SecteurSiteDto,
  })
  secteur: SecteurSiteDto;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty({
    type: ExpositionDto,
  })
  exposition: ExpositionDto;
}
