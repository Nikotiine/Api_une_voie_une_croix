import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lat: string;
  @ApiProperty()
  lng: string;
}
