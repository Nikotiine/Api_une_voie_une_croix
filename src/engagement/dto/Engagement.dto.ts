import { ApiProperty } from '@nestjs/swagger';

export class EngagementDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  label: string;
}
