import { ApiProperty } from '@nestjs/swagger';

export class UserEditPasswordDto {
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
}
