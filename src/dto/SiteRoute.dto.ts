import { ApiProperty } from '@nestjs/swagger';
import { LevelDto } from './Level.dto';
import { SectorDto } from './Sector.dto';

export class SiteRouteDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({
    type: LevelDto,
  })
  level: LevelDto;
  @ApiProperty()
  height: number;
  @ApiProperty({
    type: SectorDto,
  })
  Sector: SectorDto;
}
