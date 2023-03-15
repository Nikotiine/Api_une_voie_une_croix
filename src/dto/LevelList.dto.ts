import { ApiProperty } from '@nestjs/swagger';

export class LevelListDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: '6B+',
  })
  label: string;
}
