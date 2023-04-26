import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNumber } from 'class-validator';

import { RouteProfileDto } from './RouteProfile.dto';
import { EquipmentDto } from './Equipment.dto';
import { EngagementDto } from './Engagement.dto';
import { ApproachTypeDto } from './ApproachType.dto';
import { RockTypeDto } from './RockType.dto';
import { SectorDto } from './Sector.dto';

import { SiteListDto } from './SiteList.dto';
import { RouteFootDto } from './RouteFoot.dto';
import { RouteViewDto } from './RouteView.dto';

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
  @ApiProperty({ type: [SectorDto] })
  sectors: SectorDto[];
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
  routeFoot: RouteFootDto;
  @ApiProperty({
    type: [RouteViewDto],
  })
  routes: RouteViewDto[];
}
