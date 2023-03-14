import { ApiProperty } from '@nestjs/swagger';

export class RegionListDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Auvergne Rhône-Alpe',
  })
  name: string;
}
