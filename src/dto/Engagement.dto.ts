import { ApiProperty } from '@nestjs/swagger';

export class EngagementDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Engagé',
  })
  label: string;
}
