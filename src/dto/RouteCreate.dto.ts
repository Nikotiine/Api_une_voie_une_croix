import { ApiProperty } from '@nestjs/swagger';

import { LevelListDto } from './LevelList.dto';
import { EquipmentListDto } from './EquipmentList.dto';
import { EngagementListDto } from './EngagementList.dto';
import { SecteurListDto } from './SecteurList.dto';

export class RouteCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  height: number;
  @ApiProperty()
  quickdraw: number;
  @ApiProperty({
    type: LevelListDto,
  })
  level: LevelListDto;
  @ApiProperty({
    type: EquipmentListDto,
  })
  equipment: EquipmentListDto;
  @ApiProperty({
    type: EngagementListDto,
  })
  engagement: EngagementListDto;
  @ApiProperty({
    type: SecteurListDto,
  })
  secteur: SecteurListDto;
}
