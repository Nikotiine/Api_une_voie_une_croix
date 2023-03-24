import { RouteListDto } from './RouteList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { EquipmentDto } from './Equipment.dto';
import { EngagementDto } from './Engagement.dto';
import { RockTypeDto } from './RockType.dto';

import { RouteProfileDto } from './RouteProfile.dto';

export class RouteViewDto extends RouteListDto {
  @ApiProperty({
    example: 30,
  })
  quickdraw: number;
  @ApiProperty({
    type: EquipmentDto,
  })
  equipment: EquipmentDto;
  @ApiProperty({
    type: EngagementDto,
  })
  engagement: EngagementDto;
  @ApiProperty({
    type: RockTypeDto,
  })
  rockType: RockTypeDto;
  @ApiProperty({
    type: RouteProfileDto,
  })
  routeProfile: RouteProfileDto;
}
