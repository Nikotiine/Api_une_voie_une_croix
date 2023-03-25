import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../../orm/entity/Route.entity';
import { Repository } from 'typeorm';
import { RouteCreateDto } from '../../dto/RouteCreate.dto';
import { ErrorMessage } from '../../enum/ErrorMessage.enum';
import { RouteListDto } from '../../dto/RouteList.dto';
import { RouteViewDto } from '../../dto/RouteView.dto';
import { raw } from 'express';
import { UpdateResponse } from '../../dto/UpdateResponse.dto';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route) private routeRepository: Repository<Route>,
  ) {}

  public async create(routeCreate: RouteCreateDto): Promise<RouteListDto> {
    await this.verifyNameAndSector(routeCreate.name, routeCreate.secteur.id);
    const route = await this.routeRepository.create({
      name: routeCreate.name,
      height: routeCreate.height,
      quickdraw: routeCreate.quickdraw,
      isActive: true,
      createdAt: new Date(),
      engagement: routeCreate.engagement,
      equipment: routeCreate.equipment,
      secteur: routeCreate.secteur,
      level: routeCreate.level,
      exposition: routeCreate.exposition,
      routeProfile: routeCreate.routeProfile,
      rockType: routeCreate.rockType,
    });
    return this.routeRepository.save(route);
  }

  /**
   * Verifie que le couple nom de la voie et son secteur ne soit pas deja utilisé
   * @param name de la voie
   * @param sector id du secteur
   * @private
   */
  private async verifyNameAndSector(
    name: string,
    sector: number,
  ): Promise<void> {
    const isExist = await this.routeRepository.findOneBy({
      name: name,
      secteur: {
        id: sector,
      },
    });
    if (isExist) {
      throw new HttpException(ErrorMessage.ROUTE, HttpStatus.BAD_REQUEST, {
        cause: new Error(),
      });
    }
  }

  public async findAll(): Promise<RouteListDto[]> {
    const routes = await this.routeRepository.find({
      relations: {
        equipment: true,
        engagement: true,
        secteur: {
          site: {
            department: true,
            region: true,
          },
        },
        level: true,
        exposition: true,
      },
    });
    return routes.map((r) => {
      return {
        id: r.id,
        name: r.name,
        height: r.height,
        level: {
          id: r.level.id,
          label: r.level.label,
        },
        secteur: {
          id: r.secteur.id,
          name: r.secteur.name,
          site: {
            id: r.secteur.site.id,
            name: r.secteur.site.name,
          },
        },
        createdAt: r.createdAt,
        exposition: {
          id: r.exposition.id,
          label: r.exposition.label,
        },
      };
    });
  }

  public async findById(id: number): Promise<RouteViewDto> {
    const route = await this.routeRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        equipment: true,
        engagement: true,
        exposition: true,
        rockType: true,
        routeProfile: true,
        secteur: {
          site: true,
        },
        level: true,
      },
    });
    if (!route) {
      throw new UnauthorizedException();
    }
    return {
      id: route.id,
      name: route.name,
      height: route.height,
      quickdraw: route.quickdraw,
      createdAt: route.createdAt,
      level: {
        id: route.level.id,
        label: route.level.label,
      },
      rockType: {
        id: route.rockType.id,
        label: route.rockType.label,
      },
      exposition: {
        id: route.exposition.id,
        label: route.exposition.label,
      },
      equipment: {
        id: route.equipment.id,
        label: route.equipment.label,
      },
      engagement: {
        id: route.engagement.id,
        label: route.engagement.label,
      },
      secteur: {
        id: route.secteur.id,
        name: route.secteur.name,
        site: {
          id: route.secteur.site.id,
          name: route.secteur.site.name,
        },
      },
      routeProfile: {
        id: route.routeProfile.id,
        label: route.routeProfile.label,
      },
    };
  }

  public async update(
    id: number,
    route: RouteCreateDto,
  ): Promise<RouteViewDto> {
    await this.verifyNameAndSector(route.name, route.secteur.id);
    const entity = await this.routeRepository.preload({
      id,
      name: route.name,
      height: route.height,
      quickdraw: route.quickdraw,
      updatedAt: new Date(),
      engagement: route.engagement,
      equipment: route.equipment,
      secteur: route.secteur,
      level: route.level,
      exposition: route.exposition,
      routeProfile: route.routeProfile,
      rockType: route.rockType,
    });
    if (!entity) {
      throw new UnauthorizedException();
    }
    const updated = await this.routeRepository.save(entity);
    return this.findById(updated.id);
  }

  public async findRouteBySite(id: number): Promise<Route[]> {
    return this.routeRepository.find({
      where: {
        secteur: {
          site: {
            id: id,
          },
        },
      },
      relations: {
        level: true,
        secteur: true,
      },
    });
  }

  public async findAllForAdmin(): Promise<Route[]> {
    return this.routeRepository.find({
      relations: {
        level: true,
        secteur: true,
        exposition: true,
      },
    });
  }

  public async toggleStatus(id: number): Promise<UpdateResponse> {
    const route = await this.routeRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!route) {
      throw new UnauthorizedException();
    }
    route.isActive = !route.isActive;
    route.updatedAt = new Date();
    const update = await this.routeRepository.update(id, route);
    return {
      isUpdated: update.affected === 1,
    };
  }
}
