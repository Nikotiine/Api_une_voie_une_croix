import { ApiProperty } from '@nestjs/swagger';

export class RockTypeListDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Calcaire',
  })
  label: string;
}
