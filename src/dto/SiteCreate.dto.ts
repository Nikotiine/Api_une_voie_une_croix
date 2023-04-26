import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';
import { DepartmentDataDto } from './DepartmentData.dto';
import { RegionDto } from './Region.dto';
import { LevelDto } from './Level.dto';
import { EquipmentDto } from './Equipment.dto';
import { EngagementDto } from './Engagement.dto';
import { ApproachTypeDto } from './ApproachType.dto';
import { ExpositionDto } from './Exposition.dto';
import { RouteProfileDto } from './RouteProfile.dto';
import { RockTypeDto } from './RockType.dto';
import { SectorDto } from './Sector.dto';
import { UserProfileDto } from './UserProfile.dto';
import { RouteFootDto } from './RouteFoot.dto';

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
  department: DepartmentDataDto;
  @ApiProperty()
  region: RegionDto;
  @ApiProperty()
  minLevel: LevelDto;
  @ApiProperty()
  maxLevel: LevelDto;

  @ApiProperty()
  equipment: EquipmentDto;
  @ApiProperty()
  engagement: EngagementDto;
  @ApiProperty()
  approachType: ApproachTypeDto;
  @ApiProperty({
    type: [ExpositionDto],
  })
  expositions: ExpositionDto[];
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
  sectors: SectorDto[];
  @ApiProperty({
    type: () => UserProfileDto,
    nullable: false,
  })
  author: UserProfileDto;
  @ApiProperty()
  routeFoot: RouteFootDto;
}
