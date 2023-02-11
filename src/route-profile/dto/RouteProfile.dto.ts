import { ApiProperty } from '@nestjs/swagger';

export class RouteProfileDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  label: string;
}
