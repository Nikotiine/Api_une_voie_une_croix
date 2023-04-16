import { SiteListDto } from './SiteList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDto } from './UserProfile.dto';

export class AdminSitesDto extends SiteListDto {
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({
    type: UserProfileDto,
  })
  author: UserProfileDto;
}
