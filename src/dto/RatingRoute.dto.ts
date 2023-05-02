import { ApiProperty } from '@nestjs/swagger';

export class RatingRouteDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  rating: number;
}
