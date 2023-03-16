import { ApiProperty } from '@nestjs/swagger';
import { ExpositionDto } from './Exposition.dto';
import { LevelDto } from './Level.dto';
import { RockTypeDto } from './RockType.dto';
import { RouteProfileDto } from './RouteProfile.dto';
import { EquipmentDto } from './Equipment.dto';
import { EngagementDto } from './Engagement.dto';

export class DataRouteDto {
  @ApiProperty({ type: [ExpositionDto] })
  expositions: ExpositionDto[];
  @ApiProperty({ type: [LevelDto] })
  levels: LevelDto[];

  @ApiProperty({ type: [RouteProfileDto] })
  routeProfiles: RouteProfileDto[];
  @ApiProperty({ type: [EquipmentDto] })
  equipments: EquipmentDto[];
  @ApiProperty({ type: [EngagementDto] })
  engagements: EngagementDto[];
}
