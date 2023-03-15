import { ApiProperty } from '@nestjs/swagger';

export class ApproachTypeListDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'En montée raide',
  })
  label: string;
}
