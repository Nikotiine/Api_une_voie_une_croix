import { ApiProperty } from '@nestjs/swagger';

export class LevelsDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  label: string;
}
