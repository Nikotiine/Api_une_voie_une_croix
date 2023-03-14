import { ApiProperty } from '@nestjs/swagger';
import { RegionListDto } from './RegionList.dto';

export class DepartmentListDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Isere',
  })
  name: string;
  @ApiProperty({
    example: 45.200001,
  })
  lat: number;
  @ApiProperty({
    example: 5.66667,
  })
  lng: number;
  @ApiProperty()
  region: RegionListDto;
}
