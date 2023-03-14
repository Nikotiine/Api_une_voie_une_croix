import { ApiProperty } from '@nestjs/swagger';

export class SecteurListDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
