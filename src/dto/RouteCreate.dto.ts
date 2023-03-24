import { ApiProperty } from '@nestjs/swagger';

import { LevelDto } from './Level.dto';
import { EquipmentDto } from './Equipment.dto';
import { EngagementDto } from './Engagement.dto';
import { SecteurDto } from './Secteur.dto';
import { ExpositionDto } from './Exposition.dto';
import { RockTypeDto } from './RockType.dto';
import { RouteProfileDto } from './RouteProfile.dto';

export class RouteCreateDto {
  @ApiProperty({
    example: 'Space Crique',
  })
  name: string;
  @ApiProperty({
    example: 33,
  })
  height: number;
  @ApiProperty({
    example: 15,
  })
  quickdraw: number;
  @ApiProperty({
    type: LevelDto,
  })
  level: LevelDto;
  @ApiProperty({
    type: EquipmentDto,
  })
  equipment: EquipmentDto;
  @ApiProperty({
    type: EngagementDto,
  })
  engagement: EngagementDto;
  @ApiProperty({
    type: SecteurDto,
  })
  secteur: SecteurDto;
  @ApiProperty({
    type: ExpositionDto,
  })
  exposition: ExpositionDto;
  @ApiProperty({
    type: RockTypeDto,
  })
  rockType: RockTypeDto;
  @ApiProperty({
    type: RouteProfileDto,
  })
  routeProfile: RouteProfileDto;
}
