import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ExpositionListDto } from './ExpositionList.dto';
import { LevelListDto } from './LevelList.dto';
import { DepartmentListDto } from './DepartmentList.dto';
import { RouteProfileListDto } from './RouteProfileList.dto';
import { EquipmentListDto } from './EquipmentList.dto';
import { EngagementListDto } from './EngagementList.dto';
import { ApproachTypeListDto } from './ApproachTypeList.dto';
import { RockTypeListDto } from './RockTypeList.dto';
import { SecteurListDto } from './SecteurList.dto';
import { RegionListDto } from './RegionList.dto';

export class SiteViewDto {
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
  minLevel: LevelListDto;
  @ApiProperty()
  maxLevel: LevelListDto;
  @ApiProperty()
  department: DepartmentListDto;
  @ApiProperty()
  @IsNumber()
  approachTime: number;
  @ApiProperty()
  @IsNumber()
  averageRouteHeight: number;
  @ApiProperty({ type: [RouteProfileListDto] })
  routeProfiles: RouteProfileListDto[];
  @ApiProperty()
  equipment: EquipmentListDto;
  @ApiProperty()
  engagement: EngagementListDto;
  @ApiProperty()
  approachType: ApproachTypeListDto;
  @ApiProperty()
  rockType: RockTypeListDto;
  @ApiProperty({ type: [SecteurListDto] })
  secteurs: SecteurListDto[];
  @ApiProperty()
  @IsNumber()
  mainParkingLat: number;
  @ApiProperty()
  @IsNumber()
  mainParkingLng: number;
  @ApiProperty()
  @IsNumber()
  secondaryParkingLat: number;
  @ApiProperty()
  @IsNumber()
  secondaryParkingLng: number;
  @ApiProperty()
  @IsBoolean()
  water: boolean;
  @ApiProperty()
  @IsBoolean()
  wc: boolean;
  @ApiProperty()
  @IsBoolean()
  river: boolean;
  @ApiProperty()
  @IsBoolean()
  network: boolean;
  @ApiProperty()
  region: RegionListDto;
}
