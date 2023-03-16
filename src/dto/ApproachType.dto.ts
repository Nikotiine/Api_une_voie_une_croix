import { ApiProperty } from '@nestjs/swagger';

export class ApproachTypeDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'En montée raide',
  })
  label: string;
}
