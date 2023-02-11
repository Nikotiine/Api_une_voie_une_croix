import { ApiProperty } from '@nestjs/swagger';

export class ExpositionsDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  label: string;
}
