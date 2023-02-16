import { ApiProperty } from '@nestjs/swagger';

export class RegionDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
