import { ApiProperty } from '@nestjs/swagger';

export class RegionDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Auvergne Rhône-Alpe',
  })
  name: string;
}
