import { ApiProperty } from '@nestjs/swagger';
import { LevelsDto } from '../../level/dto/Levels.dto';
import { ExpositionsDto } from '../../exposition/dto/Expositions.dto';
import { RockTypeDto } from '../../rock-type/dto/RockType.dto';
import { RouteProfileDto } from '../../route-profile/dto/RouteProfile.dto';
import { EquipmentDto } from '../../equipment/dto/Equipment.dto';

import { ApproachTypeDto } from '../../approach-type/dto/ApproachType.dto';
import { EngagementDto } from '../../engagement/dto/Engagement.dto';

export class SiteDataDto {
  @ApiProperty()
  expositions: ExpositionsDto[];
  @ApiProperty()
  levels: LevelsDto[];
  @ApiProperty()
  rockTypes: RockTypeDto[];
  @ApiProperty()
  routeProfiles: RouteProfileDto[];
  @ApiProperty()
  equipments: EquipmentDto[];
  @ApiProperty()
  engagements: EngagementDto[];
  @ApiProperty()
  approachTypes: ApproachTypeDto[];
}
