import { ApiProperty } from '@nestjs/swagger';
import { RegionDto } from './Region.dto';
import { DepartmentDto } from './Department.dto';

export class DepartmentDataDto extends DepartmentDto {
  @ApiProperty({
    example: 45.200001,
  })
  lat: number;
  @ApiProperty({
    example: 5.66667,
  })
  lng: number;
  @ApiProperty()
  region: RegionDto;
}
