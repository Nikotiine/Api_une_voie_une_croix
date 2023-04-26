import { ApiProperty } from '@nestjs/swagger';

export class RouteFootDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  label: string;
}
