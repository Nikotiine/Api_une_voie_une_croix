import { ApiProperty } from '@nestjs/swagger';
import { ExpositionsDto } from '../../exposition/dto/Expositions.dto';
import { Level } from '../../orm/entity/Level';

export class SiteListDto {
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
  department: string;
  @ApiProperty()
  region: string;
  @ApiProperty()
  approachTime: number;
  @ApiProperty()
  averageRouteHeight: number;
}
