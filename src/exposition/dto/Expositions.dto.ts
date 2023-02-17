import { ApiProperty } from '@nestjs/swagger';

export class ExpositionsDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Sud',
  })
  label: string;
}
