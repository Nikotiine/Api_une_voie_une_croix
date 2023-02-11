import { ApiProperty } from '@nestjs/swagger';

export class EquipmentDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  label: string;
}
