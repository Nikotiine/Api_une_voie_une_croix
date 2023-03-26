import { SiteListDto } from './SiteList.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AdminSitesDto extends SiteListDto {
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
