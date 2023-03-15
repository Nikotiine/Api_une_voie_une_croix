import { ApiProperty } from '@nestjs/swagger';

export class ExpositionListDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Sud',
  })
  label: string;
}
