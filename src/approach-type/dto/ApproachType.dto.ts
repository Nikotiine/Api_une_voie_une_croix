import { ApiProperty } from '@nestjs/swagger';

export class ApproachTypeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  label: string;
}
