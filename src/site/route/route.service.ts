import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../../orm/entity/Route.entity';
import { Repository } from 'typeorm';
import { RouteCreateDto } from '../../dto/RouteCreate.dto';
import { ErrorMessage } from '../../enum/ErrorMessage.enum';
import { RouteListDto } from '../../dto/RouteList.dto';
import { RouteViewDto } from '../../dto/RouteView.dto';
import { UpdateResponse } from '../../dto/ApiResponse.dto';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route) private routeRepository: Repository<Route>,
  ) {}

  /**
   * Creation d'une nouvelle voie
   * @param routeCreate RouteCreateDto, descrption dans dto/RouteCreateDto
   */
  public async create(routeCreate: RouteCreateDto): Promise<RouteListDto> {
    //Verifie si le couple nom de voie / appartenance au Sector existe
    await this.verifyNameAndSector(routeCreate.name, routeCreate.sector.id);
    const route = await this.routeRepository.create({
      name: routeCreate.name,
      height: routeCreate.height,
      quickdraw: routeCreate.quickdraw,
      engagement: routeCreate.engagement,
      equipment: routeCreate.equipment,
      sector: routeCreate.sector,
      level: routeCreate.level,
      exposition: routeCreate.exposition,
      routeProfile: routeCreate.routeProfile,
      rockType: routeCreate.rockType,
      author: routeCreate.author,
      commentary: routeCreate.commentary,
      effortType: routeCreate.effortType,
    });
    return this.routeRepository.save(route);
  }

  /**
   * Verifie que le couple nom de la voie et son Sector ne soit pas deja utilisé
   * @param name de la voie
   * @param sector id du Sector
   * @private
   */
  private async verifyNameAndSector(
    name: string,
    sector: number,
  ): Promise<void> {
    const isExist = await this.routeRepository.findOneBy({
      name: name,
      sector: {
        id: sector,
      },
    });
    if (isExist) {
      //Si la voie existe deja renvoie une erreur / Liste des messages d'erreur enum/ErrorMessage
      throw new HttpException(ErrorMessage.ROUTE, HttpStatus.BAD_REQUEST, {
        cause: new Error(),
      });
    }
  }

  /**
   * Methode publique / renvoie la liste de toutes les voies actives
   */
  public async findAllActive(): Promise<RouteListDto[]> {
    const routes = await this.routeRepository.find({
      where: {
        isActive: true,
      },
      relations: {
        equipment: true,
        engagement: true,
        sector: {
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
        sector: {
          id: r.sector.id,
          name: r.sector.name,
          site: {
            id: r.sector.site.id,
            name: r.sector.site.name,
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

  /**
   * Retrouve une voie avec son id
   * @param id de la voie
   */
  public async findById(id: number): Promise<RouteViewDto> {
    const route = await this.routeRepository.findOne({
      where: {
        id: id,
        isActive: true,
      },
      relations: {
        equipment: true,
        engagement: true,
        exposition: true,
        rockType: true,
        routeProfile: true,
        sector: {
          site: true,
        },
        level: true,
      },
    });
    //Si l'id passer en parametre est invalide renvoie une erreur 404
    if (!route) {
      throw new NotFoundException();
    }
    //Copnstruit l'objet RouteViewDto, descritpion dans dto/RouteViewDto
    return {
      id: route.id,
      name: route.name,
      height: route.height,
      quickdraw: route.quickdraw,
      commentary: route.commentary,
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
      sector: {
        id: route.sector.id,
        name: route.sector.name,
        site: {
          id: route.sector.site.id,
          name: route.sector.site.name,
        },
      },
      routeProfile: {
        id: route.routeProfile.id,
        label: route.routeProfile.label,
      },
      effortType: route.effortType,
    };
  }

  /**
   * Mise a joue de la voie / Reserver aux admin
   * TODO:Permettre a l'auteur d'acceder a cette methode
   * @param id
   * @param route
   */
  public async update(
    id: number,
    route: RouteCreateDto,
  ): Promise<RouteViewDto> {
    await this.verifyNameAndSector(route.name, route.sector.id);
    const entity = await this.routeRepository.preload({
      id,
      name: route.name,
      height: route.height,
      quickdraw: route.quickdraw,
      engagement: route.engagement,
      equipment: route.equipment,
      sector: route.sector,
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

  /**
   * Methode pour le siteController / renvoie la liste des voie pour le site passer en parametre
   * @param id du site
   */
  public async findRouteBySite(id: number): Promise<Route[]> {
    return this.routeRepository.find({
      where: {
        sector: {
          site: {
            id: id,
          },
        },
        isActive: true,
      },
      relations: {
        level: true,
        sector: {
          site: true,
        },
        exposition: true,
      },
    });
  }

  /**
   * Reserver a l'adminController / renvoie la liste de toules les voies active ou non
   */
  public async findAllForAdmin(): Promise<Route[]> {
    return this.routeRepository.find({
      relations: {
        level: true,
        sector: {
          site: true,
        },
        exposition: true,
        author: true,
      },
    });
  }

  /**
   * Reserver a l'adminController / Permet de changer le status de la voie (actif / inactif)
   * @param id de la voie
   */
  public async toggleStatus(id: number): Promise<UpdateResponse> {
    const route = await this.routeRepository.findOne({
      where: {
        id: id,
      },
    });
    //Si l'id passer en parametre est invalide renvoie une erreur 404
    if (!route) {
      throw new NotFoundException();
    }
    route.isActive = !route.isActive;
    const update = await this.routeRepository.update(id, route);
    return {
      isUpdated: update.affected === 1,
    };
  }

  public async findLastFiveEntry(): Promise<Route[]> {
    return this.routeRepository.find({
      where: {
        isActive: true,
      },
      order: {
        id: 'ASC',
      },
      relations: {
        sector: {
          site: true,
        },
        level: true,
        exposition: true,
      },
      take: 5,
    });
  }
  public async countAll(): Promise<number> {
    return this.routeRepository.count({
      where: {
        isActive: true,
      },
    });
  }
}
