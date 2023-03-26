import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AdminUsersDto } from '../dto/AdminUsers.dto';
import { SiteService } from '../site/site/site.service';
import { RouteService } from '../site/route/route.service';
import { AdminSitesDto } from '../dto/AdminSites.dto';
import { AdminRoutesDto } from '../dto/AdminRoutes.dto';
import { UpdateResponse } from '../dto/UpdateResponse.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly siteService: SiteService,
    private readonly routeService: RouteService,
  ) {}

  public async findAllUsers(): Promise<AdminUsersDto[]> {
    const users = await this.userService.finAllForAdmin();
    return users.map((u) => {
      return {
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        isActive: u.isActive,
        createdAt: u.createdAt,
        birthday: u.birthday,
        role: u.role,
        updatedAt: u.updatedAt,
      };
    });
  }

  public async findAllSites(): Promise<AdminSitesDto[]> {
    const sites = await this.siteService.findAllSiteForAdmin();
    console.log(sites);
    return sites.map((s) => {
      return {
        id: s.id,
        name: s.name,
        approachTime: s.approachTime,
        averageRouteNumber: s.averageRouteNumber,
        averageRouteHeight: s.averageRouteHeight,
        isActive: s.isActive,
        updatedAt: s.updatedAt,
        department: {
          id: s.department.id,
          lng: s.department.lng,
          lat: s.department.lat,
          name: s.department.name,
          region: s.department.region,
        },
        maxLevel: {
          id: s.maxLevel.id,
          label: s.maxLevel.label,
        },
        minLevel: {
          id: s.minLevel.id,
          label: s.minLevel.label,
        },
        createdAt: s.createdAt,
        region: {
          id: s.region.id,
          name: s.region.name,
        },
        expositions: s.expositions.map((e) => {
          return {
            id: e.id,
            label: e.label,
          };
        }),
        author: {
          id: s.author.id,
          lastName: s.author.lastName,
          firstName: s.author.firstName,
          birthday: s.author.birthday,
          email: s.author.email,
        },
      };
    });
  }

  public async findAllRoutes(): Promise<AdminRoutesDto[]> {
    const routes = await this.routeService.findAllForAdmin();
    return routes.map((r) => {
      return {
        id: r.id,
        name: r.name,
        level: {
          id: r.level.id,
          label: r.level.label,
        },
        isActive: r.isActive,
        createdAt: r.createdAt,
        secteur: {
          id: r.secteur.id,
          name: r.secteur.name,
          site: {
            id: r.secteur.site.id,
            name: r.secteur.site.name,
          },
        },
        exposition: {
          id: r.exposition.id,
          label: r.exposition.label,
        },
        height: r.height,
        updatedAt: r.updatedAt,
      };
    });
  }

  public async toggleUserStatus(id: number): Promise<UpdateResponse> {
    return this.userService.toggleStatus(id);
  }

  public async toggleSiteStatus(id: number): Promise<UpdateResponse> {
    return this.siteService.toggleStatus(id);
  }

  public async toggleRouteStatus(id: number): Promise<UpdateResponse> {
    return this.routeService.toggleStatus(id);
  }

  public async changeUserRole(id: number, user: AdminUsersDto) {
    return this.userService.changeUserRole(id, user);
  }
}
