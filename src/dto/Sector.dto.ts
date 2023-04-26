import { ApiProperty } from '@nestjs/swagger';

export class SectorDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Grande Face',
  })
  name: string;
}
