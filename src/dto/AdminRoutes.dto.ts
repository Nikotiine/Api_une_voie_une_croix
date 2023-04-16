import { RouteListDto } from './RouteList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDto } from './UserProfile.dto';

export class AdminRoutesDto extends RouteListDto {
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({
    type: UserProfileDto,
  })
  author: UserProfileDto;
}
