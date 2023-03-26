import { UserProfileDto } from './UserProfile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AdminUsersDto extends UserProfileDto {
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty({
    nullable: true,
  })
  updatedAt: Date;
}
