import { ApiProperty } from '@nestjs/swagger';
import { LevelDto } from './Level.dto';
import { EquipmentDto } from './Equipment.dto';
import { EngagementDto } from './Engagement.dto';
import { SecteurDto } from './Secteur.dto';
import { RouteDto } from './Route.dto';

export class RouteListDto extends RouteDto {
  @ApiProperty({
    example: 33,
  })
  height: number;
  @ApiProperty({
    example: 30,
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
}
