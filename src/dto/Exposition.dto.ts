import { ApiProperty } from '@nestjs/swagger';

export class ExpositionDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Sud',
  })
  label: string;
}
