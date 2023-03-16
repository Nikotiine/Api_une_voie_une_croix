import { ApiProperty } from '@nestjs/swagger';

import { Level } from '../orm/entity/Level.entity';

import { IsNumber } from 'class-validator';
import { ExpositionDto } from './Exposition.dto';
import { DepartmentDto } from './Department.dto';
import { RegionDto } from './Region.dto';
import { SiteDto } from './Site.dto';

export class SiteListDto extends SiteDto {
  @ApiProperty({ type: [ExpositionDto] })
  expositions: ExpositionDto[];
  @ApiProperty()
  @IsNumber()
  averageRouteNumber: number;
  @ApiProperty()
  minLevel: Level;
  @ApiProperty()
  maxLevel: Level;
  @ApiProperty()
  department: DepartmentDto;
  @ApiProperty()
  region: RegionDto;
  @ApiProperty()
  @IsNumber()
  approachTime: number;
  @ApiProperty()
  @IsNumber()
  averageRouteHeight: number;
}
