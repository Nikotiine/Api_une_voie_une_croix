import { ApiProperty } from '@nestjs/swagger';
import { ExpositionsDto } from '../../exposition/dto/Expositions.dto';
import { RouteProfileDto } from '../../route-profile/dto/RouteProfile.dto';
import { EquipmentDto } from '../../equipment/dto/Equipment.dto';
import { EngagementDto } from '../../engagement/dto/Engagement.dto';
import { ApproachTypeDto } from '../../approach-type/dto/ApproachType.dto';
import { RockTypeDto } from '../../rock-type/dto/RockType.dto';
import { SecteurDto } from '../../secteur/dto/Secteur.dto';
import { LevelsDto } from '../../level/dto/Levels.dto';
import { DepartmentDto } from '../../department/dto/Department.dto';
import { RegionDto } from '../../region/dto/Region.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class SiteViewDto {
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
  minLevel: LevelsDto;
  @ApiProperty()
  maxLevel: LevelsDto;
  @ApiProperty()
  department: DepartmentDto;
  @ApiProperty()
  @IsNumber()
  approachTime: number;
  @ApiProperty()
  @IsNumber()
  averageRouteHeight: number;
  @ApiProperty({ type: [RouteProfileDto] })
  routeProfiles: RouteProfileDto[];
  @ApiProperty()
  equipment: EquipmentDto;
  @ApiProperty()
  engagement: EngagementDto;
  @ApiProperty()
  approachType: ApproachTypeDto;
  @ApiProperty()
  rockType: RockTypeDto;
  @ApiProperty({ type: [SecteurDto] })
  secteurs: SecteurDto[];
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
  region: RegionDto;
}
