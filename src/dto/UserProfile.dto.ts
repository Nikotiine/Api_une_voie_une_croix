import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({
    example: 'john',
  })
  firstName: string;
  @ApiProperty({
    example: 'Doe',
  })
  lastName: string;
  @ApiProperty()
  birthday: Date;
  @ApiProperty({
    example: 'john.doe@gmail.com',
  })
  email: string;
  @ApiProperty({
    example: 1,
  })
  id: number;
}
