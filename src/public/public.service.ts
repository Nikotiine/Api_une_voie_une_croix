import { Injectable } from '@nestjs/common';
import { RouteService } from '../site/route/route.service';
import { SiteService } from '../site/site/site.service';
import { UserService } from '../user/user.service';
import { PublicDataDto } from '../dto/PublicData.dto';
import { NotebookService } from '../notebook/notebook.service';

@Injectable()
export class PublicService {
  constructor(
    private readonly routeService: RouteService,
    private readonly siteService: SiteService,
    private readonly userService: UserService,
    private readonly notebookService: NotebookService,
  ) {}

  public async findDataForPublicHomePage(): Promise<PublicDataDto> {
    const totalSites = await this.siteService.countAll();
    const lastFiveSites = await this.siteService.findLastFiveEntry();
    const totalRoutes = await this.routeService.countAll();
    const lastFiveRoutes = await this.routeService.findLastFiveEntry();
    const totalUsers = await this.userService.countAll();
    const lastFiveCheckedRoutes =
      await this.notebookService.getLastFiveCheckedRoutes();
    return {
      totalRoutes: totalRoutes,
      totalSites: totalSites,
      totalUsers: totalUsers,
      lastFiveRoute: lastFiveRoutes,
      lastFiveSite: lastFiveSites,
      lastFiveCheckedRoutes: lastFiveCheckedRoutes,
    };
  }
}
