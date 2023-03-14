import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';
import { DepartmentListDto } from '../../location/dto/DepartmentList.dto';
import { RegionListDto } from '../../location/dto/RegionList.dto';
import { LevelListDto } from '../../general-informations/dto/LevelList.dto';
import { EquipmentListDto } from '../../general-informations/dto/EquipmentList.dto';
import { EngagementListDto } from '../../general-informations/dto/EngagementList.dto';
import { ApproachTypeListDto } from '../../general-informations/dto/ApproachTypeList.dto';
import { ExpositionListDto } from '../../general-informations/dto/ExpositionList.dto';
import { RouteProfileListDto } from '../../general-informations/dto/RouteProfileList.dto';
import { RockTypeListDto } from '../../general-informations/dto/RockTypeList.dto';
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
