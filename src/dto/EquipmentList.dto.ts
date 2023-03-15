import { ApiProperty } from '@nestjs/swagger';

export class EquipmentListDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Plaquette',
  })
  label: string;
}
