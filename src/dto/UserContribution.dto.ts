import { ApiProperty } from '@nestjs/swagger';
import { SiteDto } from './Site.dto';
import { RouteListDto } from './RouteList.dto';

export class UserContributionDto {
  @ApiProperty({
    type: [SiteDto],
  })
  sites: SiteDto[];
  @ApiProperty({
    type: [RouteListDto],
  })
  routes: RouteListDto[];
}
