import { Injectable } from '@nestjs/common';
import { RouteService } from '../site/route/route.service';
import { SiteService } from '../site/site/site.service';
import { UserService } from '../user/user.service';
import { PublicDataDto } from '../dto/PublicData.dto';

@Injectable()
export class PublicService {
  constructor(
    private readonly routeService: RouteService,
    private readonly siteService: SiteService,
    private readonly userService: UserService,
  ) {}

  public async findDataForPublicHomePage(): Promise<PublicDataDto> {
    const totalSites = await this.siteService.countAll();
    const lastSite = await this.siteService.findLastEntry();
    const totalRoutes = await this.routeService.countAll();
    const lastRoute = await this.routeService.findLastEntry();
    const totalUsers = await this.userService.countAll();
    return {
      totalRoutes: totalRoutes,
      totalSites: totalSites,
      totalUsers: totalUsers,
      lastRoute: lastRoute,
      lastSite: lastSite,
    };
  }
}
