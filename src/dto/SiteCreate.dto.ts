import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';
import { DepartmentListDto } from './DepartmentList.dto';
import { RegionListDto } from './RegionList.dto';
import { LevelListDto } from './LevelList.dto';
import { EquipmentListDto } from './EquipmentList.dto';
import { EngagementListDto } from './EngagementList.dto';
import { ApproachTypeListDto } from './ApproachTypeList.dto';
import { ExpositionListDto } from './ExpositionList.dto';
import { RouteProfileListDto } from './RouteProfileList.dto';
import { RockTypeListDto } from './RockTypeList.dto';
import { SecteurListDto } from './SecteurList.dto';

export class SiteCreateDto {
  @ApiProperty({
    example: 'La crique',
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: 15,
  })
  @IsNumber()
  @IsPositive()
  approachTime: number;
  @ApiProperty({
    example: 35,
  })
  @IsNumber()
  @IsPositive()
  averageRouteHeight: number;
  @ApiProperty({
    example: 80,
  })
  @IsNumber()
  @IsPositive()
  averageRouteNumber: number;

  @ApiProperty({
    example: 45.100606,
  })
  @IsNumber()
  mainParkingLat: number;
  @ApiProperty({
    example: 5.475301,
  })
  @IsNumber()
  mainParkingLng: number;
  @ApiProperty({
    example: 45.200606,
  })
  @IsNumber()
  secondaryParkingLat: number;
  @ApiProperty({
    example: 5.575301,
  })
  @IsNumber()
  secondaryParkingLng: number;
  @ApiProperty()
  department: DepartmentListDto;
  @ApiProperty()
  region: RegionListDto;
  @ApiProperty()
  minLevel: LevelListDto;
  @ApiProperty()
  maxLevel: LevelListDto;

  @ApiProperty()
  equipment: EquipmentListDto;
  @ApiProperty()
  engagement: EngagementListDto;
  @ApiProperty()
  approachType: ApproachTypeListDto;
  @ApiProperty({
    type: [ExpositionListDto],
  })
  expositions: ExpositionListDto[];
  @ApiProperty({
    type: [RouteProfileListDto],
  })
  routeProfiles: RouteProfileListDto[];
  @ApiProperty()
  rockType: RockTypeListDto;
  @ApiProperty()
  @IsBoolean()
  river: boolean;
  @ApiProperty()
  @IsBoolean()
  network: boolean;
  @ApiProperty()
  @IsBoolean()
  wc: boolean;
  @ApiProperty()
  @IsBoolean()
  water: boolean;
  @ApiProperty()
  secteurs: SecteurListDto[];
}
