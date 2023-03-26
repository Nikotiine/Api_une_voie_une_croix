import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enum/UserRole.enum';

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
  @ApiProperty({
    enum: UserRole,
  })
  readonly role?: UserRole;
}
