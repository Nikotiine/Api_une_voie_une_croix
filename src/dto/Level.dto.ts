import { ApiProperty } from '@nestjs/swagger';

export class LevelDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: '6B+',
  })
  label: string;
}
