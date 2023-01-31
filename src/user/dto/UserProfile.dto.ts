import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty()
  fistName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  birthday: Date;
  @ApiProperty()
  email: string;
  @ApiProperty()
  id: number;
}
