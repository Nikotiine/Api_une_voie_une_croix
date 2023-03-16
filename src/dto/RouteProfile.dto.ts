import { ApiProperty } from '@nestjs/swagger';

export class RouteProfileDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Gros devers',
  })
  label: string;
}
