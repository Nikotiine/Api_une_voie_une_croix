import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Isere',
  })
  name: string;
}
