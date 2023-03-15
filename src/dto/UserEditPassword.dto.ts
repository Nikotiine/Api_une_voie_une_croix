import { ApiProperty } from '@nestjs/swagger';

export class UserEditPasswordDto {
  @ApiProperty({
    example: 'Old pawword',
  })
  oldPassword: string;
  @ApiProperty({
    example: 'New password',
  })
  newPassword: string;
}
