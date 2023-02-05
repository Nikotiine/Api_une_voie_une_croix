import { Point, Position } from 'geojson';
import { ApiProperty } from '@nestjs/swagger';

export class PointDto implements Point {
  @ApiProperty()
  coordinates: Position;
  type: 'Point';
}
