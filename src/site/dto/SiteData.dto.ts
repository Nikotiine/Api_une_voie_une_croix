import { ApiProperty } from '@nestjs/swagger';
import { LevelsDto } from '../../level/dto/Levels.dto';
import { ExpositionsDto } from '../../exposition/dto/Expositions.dto';
import { RockTypeDto } from '../../rock-type/dto/RockType.dto';
import { RouteProfileDto } from '../../route-profile/dto/RouteProfile.dto';
import { EquipmentDto } from '../../equipment/dto/Equipment.dto';

import { ApproachTypeDto } from '../../approach-type/dto/ApproachType.dto';
import { EngagementDto } from '../../engagement/dto/Engagement.dto';

export class SiteDataDto {
  @ApiProperty({ type: [ExpositionsDto] })
  expositions: ExpositionsDto[];
  @ApiProperty({ type: [LevelsDto] })
  levels: LevelsDto[];
  @ApiProperty({ type: [RockTypeDto] })
  rockTypes: RockTypeDto[];
  @ApiProperty({ type: [RouteProfileDto] })
  routeProfiles: RouteProfileDto[];
  @ApiProperty({ type: [EquipmentDto] })
  equipments: EquipmentDto[];
  @ApiProperty({ type: [EngagementDto] })
  engagements: EngagementDto[];
  @ApiProperty({ type: [ApproachTypeDto] })
  approachTypes: ApproachTypeDto[];
}
