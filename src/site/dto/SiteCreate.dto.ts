import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';
import { SecteurDto } from '../../secteur/dto/Secteur.dto';
import { DepartmentDto } from '../../department/dto/Department.dto';
import { RegionDto } from '../../region/dto/Region.dto';
import { LevelsDto } from '../../level/dto/Levels.dto';
import { EquipmentDto } from '../../equipment/dto/Equipment.dto';
import { EngagementDto } from '../../engagement/dto/Engagement.dto';
import { ApproachTypeDto } from '../../approach-type/dto/ApproachType.dto';
import { ExpositionsDto } from '../../exposition/dto/Expositions.dto';
import { RouteProfileDto } from '../../route-profile/dto/RouteProfile.dto';
import { RockTypeDto } from '../../rock-type/dto/RockType.dto';

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
  department: DepartmentDto;
  @ApiProperty()
  region: RegionDto;
  @ApiProperty()
  minLevel: LevelsDto;
  @ApiProperty()
  maxLevel: LevelsDto;

  @ApiProperty()
  equipment: EquipmentDto;
  @ApiProperty()
  engagement: EngagementDto;
  @ApiProperty()
  approachType: ApproachTypeDto;
  @ApiProperty({
    type: [ExpositionsDto],
  })
  expositions: ExpositionsDto[];
  @ApiProperty({
    type: [RouteProfileDto],
  })
  routeProfiles: RouteProfileDto[];
  @ApiProperty()
  rockType: RockTypeDto;
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
  secteurs: SecteurDto[];
}
