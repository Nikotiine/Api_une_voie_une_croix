import { ApiProperty } from '@nestjs/swagger';

export class RouteProfileListDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Gros devers',
  })
  label: string;
}
