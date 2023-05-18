import { ApiProperty } from '@nestjs/swagger';

import { RouteListDto } from './RouteList.dto';
import { SiteListDto } from './SiteList.dto';

export class PublicDataDto {
  @ApiProperty()
  totalUsers: number;
  @ApiProperty()
  totalRoutes: number;
  @ApiProperty()
  totalSites: number;
  @ApiProperty({
    type: [SiteListDto],
  })
  lastFiveSite: SiteListDto[];
  @ApiProperty({
    type: [RouteListDto],
  })
  lastFiveRoute: RouteListDto[];
  @ApiProperty({
    type: [RouteListDto],
  })
  lastFiveCheckedRoutes: RouteListDto[];
}
