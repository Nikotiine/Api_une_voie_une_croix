import { ApiProperty } from '@nestjs/swagger';
import { ExpositionsDto } from '../../exposition/dto/Expositions.dto';
import { Level } from '../../orm/entity/Level';

import { RegionDto } from '../../region/dto/Region.dto';
import { DepartmentDto } from '../../department/dto/Department.dto';
import { IsNumber, IsString } from 'class-validator';

export class SiteListDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty({ type: [ExpositionsDto] })
  expositions: ExpositionsDto[];
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
