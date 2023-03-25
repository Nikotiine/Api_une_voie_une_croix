import { ApiProperty } from '@nestjs/swagger';

export class UpdateResponse {
  @ApiProperty()
  isUpdated: boolean;
}
