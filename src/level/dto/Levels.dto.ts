import { ApiProperty } from '@nestjs/swagger';

export class LevelsDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: '6B+',
  })
  label: string;
}
