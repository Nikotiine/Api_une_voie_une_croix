import { ApiProperty } from '@nestjs/swagger';

export class UpdateResponse {
  @ApiProperty()
  isUpdated: boolean;
}
export class DeleteResponse {
  @ApiProperty()
  isDeleted: boolean;
}
