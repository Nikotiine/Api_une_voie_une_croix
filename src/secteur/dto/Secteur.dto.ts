import { ApiProperty } from '@nestjs/swagger';

export class SecteurDto {
  @ApiProperty()
  name: string;
}
