import { ApiProperty } from '@nestjs/swagger';

export class SecteurDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Grande Face',
  })
  name: string;
}
