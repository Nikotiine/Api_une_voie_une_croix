import { ApiProperty } from '@nestjs/swagger';

export class RouteDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Rose des vents',
  })
  name: string;
}
