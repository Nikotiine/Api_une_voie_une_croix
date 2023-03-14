import { ApiProperty } from '@nestjs/swagger';

export class EngagementListDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    example: 'Engagé',
  })
  label: string;
}
