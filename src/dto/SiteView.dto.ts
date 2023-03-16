import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNumber } from 'class-validator';

import { RouteProfileDto } from './RouteProfile.dto';
import { EquipmentDto } from './Equipment.dto';
import { EngagementDto } from './Engagement.dto';
import { ApproachTypeDto } from './ApproachType.dto';
import { RockTypeDto } from './RockType.dto';
import { SecteurDto } from './Secteur.dto';

import { SiteListDto } from './SiteList.dto';

export class SiteViewDto extends SiteListDto {
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
}
