import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  birthday: Date;
  @ApiProperty()
  email: string;
  @ApiProperty()
  id: number;
}
