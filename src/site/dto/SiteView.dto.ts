import { ApiProperty } from '@nestjs/swagger';
import { ExpositionsDto } from '../../exposition/dto/Expositions.dto';
import { Level } from '../../orm/entity/Level';
import { RouteProfileDto } from '../../route-profile/dto/RouteProfile.dto';
import { EquipmentDto } from '../../equipment/dto/Equipment.dto';
import { EngagementDto } from '../../engagement/dto/Engagement.dto';
import { ApproachTypeDto } from '../../approach-type/dto/ApproachType.dto';
import { RockTypeDto } from '../../rock-type/dto/RockType.dto';
import { SecteurDto } from '../../secteur/dto/Secteur.dto';

export class SiteViewDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [ExpositionsDto] })
  expositions: ExpositionsDto[];
  @ApiProperty()
  averageRouteNumber: number;
  @ApiProperty()
  minLevel: Level;
  @ApiProperty()
  maxLevel: Level;
  @ApiProperty()
  zipCode: string;
  @ApiProperty()
  approachTime: number;
  @ApiProperty()
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
  mainParking: string;
  @ApiProperty()
  secondaryParking: string;
  @ApiProperty()
  water: boolean;
  @ApiProperty()
  wc: boolean;
  @ApiProperty()
  river: boolean;
  @ApiProperty()
  network: boolean;
}