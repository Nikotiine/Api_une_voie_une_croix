import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty()
  fistName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  birthday: Date;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}