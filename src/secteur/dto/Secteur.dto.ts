import { ApiProperty } from '@nestjs/swagger';

export class SecteurDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
