import { ApiProperty } from '@nestjs/swagger';

import { Level } from '../../orm/entity/Level.entity';

import { IsNumber, IsString } from 'class-validator';
import { ExpositionListDto } from '../../general-informations/dto/ExpositionList.dto';
import { DepartmentListDto } from '../../location/dto/DepartmentList.dto';
import { RegionListDto } from '../../location/dto/RegionList.dto';

export class SiteListDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty({ type: [ExpositionListDto] })
  expositions: ExpositionListDto[];
  @ApiProperty()
  @IsNumber()
  averageRouteNumber: number;
  @ApiProperty()
  minLevel: Level;
  @ApiProperty()
  maxLevel: Level;
  @ApiProperty()
  department: DepartmentListDto;
  @ApiProperty()
  region: RegionListDto;
  @ApiProperty()
  @IsNumber()
  approachTime: number;
  @ApiProperty()
  @IsNumber()
  averageRouteHeight: number;
}
