import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  fistName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  birthday: Date;
  @ApiProperty()
  email: string;
}
