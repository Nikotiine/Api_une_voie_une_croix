import { ApiProperty } from '@nestjs/swagger';

export class RockTypeDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Calcaire',
  })
  label: string;
}
