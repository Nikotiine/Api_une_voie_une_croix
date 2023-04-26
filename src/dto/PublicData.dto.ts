import { ApiProperty } from '@nestjs/swagger';
import { SiteDto } from './Site.dto';
import { RouteDto } from './Route.dto';

export class PublicDataDto {
  @ApiProperty()
  totalUsers: number;
  @ApiProperty()
  totalRoutes: number;
  @ApiProperty()
  totalSites: number;
  @ApiProperty({
    type: SiteDto,
  })
  lastSite: SiteDto;
  @ApiProperty({
    type: RouteDto,
  })
  lastRoute: RouteDto;
}
