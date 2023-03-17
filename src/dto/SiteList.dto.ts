import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ExpositionDto } from './Exposition.dto';

import { RegionDto } from './Region.dto';
import { SiteDto } from './Site.dto';
import { LevelDto } from './Level.dto';
import { DepartmentDataDto } from './DepartmentData.dto';

export class SiteListDto extends SiteDto {
  @ApiProperty({ type: [ExpositionDto] })
  expositions: ExpositionDto[];
  @ApiProperty()
  @IsNumber()
  averageRouteNumber: number;
  @ApiProperty()
  minLevel: LevelDto;
  @ApiProperty()
  maxLevel: LevelDto;
  @ApiProperty()
  department: DepartmentDataDto;
  @ApiProperty()
  region: RegionDto;
  @ApiProperty()
  @IsNumber()
  approachTime: number;
  @ApiProperty()
  @IsNumber()
  averageRouteHeight: number;
}
