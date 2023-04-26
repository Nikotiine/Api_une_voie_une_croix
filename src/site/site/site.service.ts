import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from '../../orm/entity/Site.entity';
import { SiteCreateDto } from '../../dto/SiteCreate.dto';
import { SiteListDto } from '../../dto/SiteList.dto';
import { SiteViewDto } from '../../dto/SiteView.dto';
import { SiteDto } from '../../dto/Site.dto';
import { RouteService } from '../route/route.service';
import { SiteRouteDto } from '../../dto/SiteRoute.dto';
import { UpdateResponse } from '../../dto/UpdateResponse.dto';
import { ErrorMessage } from '../../enum/ErrorMessage.enum';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>,
    private readonly routeService: RouteService,
  ) {}

  /**
   * Methode publique / Retrouve tous les sites actifs
   * Renvoie une liste de SiteListDto, Description dans dto/SiteListDto
   */
  public async findAll(): Promise<SiteListDto[]> {
    const sites = await this.siteRepository.find({
      where: {
        isActive: true,
      },
      relations: {
        expositions: true,
        minLevel: true,
        maxLevel: true,
        department: true,
        region: true,
      },
    });
    //Construction du SiteListDto[]
    return sites.map((site) => {
      return {
        id: site.id,
        name: site.name,
        expositions: site.expositions.map((e) => {
          return {
            id: e.id,
            label: e.label,
          };
        }),
        approachTime: site.approachTime,
        averageRouteNumber: site.averageRouteNumber,
        averageRouteHeight: site.averageRouteHeight,
        region: {
          id: site.region.id,
          name: site.region.name,
        },
        department: {
          id: site.department.id,
          name: site.department.name,
          lat: site.department.lat,
          lng: site.department.lng,
          region: site.department.region,
        },
        maxLevel: {
          id: site.maxLevel.id,
          label: site.maxLevel.label,
        },
        minLevel: {
          id: site.minLevel.id,
          label: site.minLevel.label,
        },
      };
    });
  }

  /**
   * Methode pour la creation d'un nouveau site
   * @param createSiteDto description dans dto => SiteCreateDto
   */
  public async create(createSiteDto: SiteCreateDto): Promise<Site> {
    //Verification prealable si il existe pas deja un site avec le meme nom
    const isExist = await this.findByName(createSiteDto.name);
    if (isExist) {
      //Les messages d'erreur sont dans enum/ErrorMessage.enum
      throw new HttpException(ErrorMessage.SITE_EXIST, HttpStatus.BAD_REQUEST, {
        cause: new Error(),
      });
    }
    const site = this.siteRepository.create({
      name: createSiteDto.name,
      approachTime: createSiteDto.approachTime,
      averageRouteHeight: createSiteDto.averageRouteHeight,
      averageRouteNumber: createSiteDto.averageRouteNumber,
      expositions: createSiteDto.expositions,
      routeProfiles: createSiteDto.routeProfiles,
      minLevel: createSiteDto.minLevel,
      maxLevel: createSiteDto.maxLevel,
      equipment: createSiteDto.equipment,
      engagement: createSiteDto.engagement,
      approachType: createSiteDto.approachType,
      rockType: createSiteDto.rockType,
      sectors: createSiteDto.sectors,
      mainParkingLat: createSiteDto.mainParkingLat,
      mainParkingLng: createSiteDto.mainParkingLng,
      secondaryParkingLat: createSiteDto.secondaryParkingLat,
      secondaryParkingLng: createSiteDto.secondaryParkingLng,
      department: createSiteDto.department,
      region: createSiteDto.region,
      water: createSiteDto.water,
      network: createSiteDto.network,
      wc: createSiteDto.wc,
      river: createSiteDto.river,
      author: createSiteDto.author,
      routeFoot: createSiteDto.routeFoot,
    });
    //Ajout des Sectors du nouveau site
    site.sectors.forEach((Sector) => {
      Sector.isActive = true;
      // Sector.createdAt = new Date();
    });

    //TODO:A verifer au retour si c'est bien typer
    return this.siteRepository.save(site);
  }

  /**
   * Retrouve un site avec son id
   * @param id du site
   */
  public async findOneById(id: number): Promise<SiteViewDto> {
    const site = await this.siteRepository.findOne({
      where: {
        id: id,
        isActive: true,
      },
      relations: {
        expositions: true,
        routeProfiles: true,
        maxLevel: true,
        minLevel: true,
        engagement: true,
        equipment: true,
        rockType: true,
        sectors: {
          routes: true,
        },
        approachType: true,
        region: true,
        department: true,
        routeFoot: true,
      },
    });

    // Si l'id du site est invalide renvoie une erreur 404
    if (!site) {
      throw new NotFoundException();
    }

    //construction du SiteViewDto
    return {
      id: site.id,
      name: site.name,
      expositions: site.expositions.map((e) => {
        return {
          id: e.id,
          label: e.label,
        };
      }),
      averageRouteHeight: site.averageRouteHeight,
      averageRouteNumber: site.averageRouteNumber,
      minLevel: {
        id: site.minLevel.id,
        label: site.minLevel.label,
      },
      maxLevel: {
        id: site.maxLevel.id,
        label: site.maxLevel.label,
      },
      department: {
        id: site.department.id,
        name: site.department.name,
        lat: site.department.lat,
        lng: site.department.lng,
        region: site.department.region,
      },
      region: {
        id: site.region.id,
        name: site.region.name,
      },
      approachTime: site.approachTime,
      routeProfiles: site.routeProfiles.map((r) => {
        return {
          id: r.id,
          label: r.label,
        };
      }),
      equipment: {
        id: site.equipment.id,
        label: site.equipment.label,
      },
      engagement: {
        id: site.engagement.id,
        label: site.engagement.label,
      },
      approachType: {
        id: site.approachType.id,
        label: site.approachType.label,
      },
      rockType: {
        id: site.rockType.id,
        label: site.rockType.label,
      },
      sectors: site.sectors.map((s) => {
        return {
          id: s.id,
          name: s.name,
        };
      }),
      mainParkingLat: site.mainParkingLat,
      mainParkingLng: site.mainParkingLng,
      secondaryParkingLat: site.secondaryParkingLat,
      secondaryParkingLng: site.secondaryParkingLng,
      water: site.water,
      wc: site.wc,
      network: site.network,
      river: site.river,
      routeFoot: {
        id: site.routeFoot.id,
        label: site.routeFoot.label,
      },
    };
  }

  /**
   * Mise a jour du site / Methode reserve aux admin
   * TODO : Permettre la modification a l'auteur du site
   * @param id du site
   * @param createSiteDto description dans dto => SiteCreateDto
   */
  public async update(
    id: number,
    createSiteDto: SiteCreateDto,
  ): Promise<SiteViewDto> {
    const entity = await this.siteRepository.preload({
      id,
      name: createSiteDto.name,
      approachTime: createSiteDto.approachTime,
      averageRouteHeight: createSiteDto.averageRouteHeight,
      averageRouteNumber: createSiteDto.averageRouteNumber,
      expositions: createSiteDto.expositions,
      routeProfiles: createSiteDto.routeProfiles,
      minLevel: createSiteDto.minLevel,
      maxLevel: createSiteDto.maxLevel,
      equipment: createSiteDto.equipment,
      engagement: createSiteDto.engagement,
      approachType: createSiteDto.approachType,
      rockType: createSiteDto.rockType,
      sectors: createSiteDto.sectors,
      mainParkingLat: createSiteDto.mainParkingLat,
      mainParkingLng: createSiteDto.mainParkingLng,
      secondaryParkingLat: createSiteDto.secondaryParkingLat,
      secondaryParkingLng: createSiteDto.secondaryParkingLng,
      department: createSiteDto.department,
      region: createSiteDto.region,
      water: createSiteDto.water,
      network: createSiteDto.network,
      wc: createSiteDto.wc,
      river: createSiteDto.river,
      updatedAt: new Date(),
    });
    //Mets a jours les Sectors
    entity.sectors.forEach((s) => {
      if (!s.id) {
        //s.createdAt = new Date();
        s.isActive = true;
      }
    });
    //TODO:Verfier le typage de retour
    return this.siteRepository.save(entity);
  }

  /**
   * Methode pout le RouteController / permet de retrouver la liste de tous les site
   * Description du retour dans dto/SiteDto
   */
  public async findAllForRoute(): Promise<SiteDto[]> {
    const sites = await this.siteRepository.find({
      where: {
        isActive: true,
      },
    });
    return sites.map((site) => {
      return {
        id: site.id,
        name: site.name,
      };
    });
  }

  /**
   * Trouve les routes associées au site
   * @param id du site
   */
  public async findRoutes(id: number): Promise<SiteRouteDto[]> {
    const routes = await this.routeService.findRouteBySite(id);

    //Construit l'objet SiteRouteDto, description dans dto/SiteRouteDto
    return routes.map((r) => {
      return {
        id: r.id,
        level: {
          id: r.level.id,
          label: r.level.label,
        },
        height: r.height,
        name: r.name,
        Sector: {
          id: r.sector.id,
          name: r.sector.name,
        },
      };
    });
  }

  /**
   * Methode reserver a l'adminController /
   * Retrouve tous les sites actif ou non
   */
  public async findAllSiteForAdmin(): Promise<Site[]> {
    return this.siteRepository.find({
      relations: {
        expositions: true,
        minLevel: true,
        maxLevel: true,
        department: true,
        region: true,
        author: true,
      },
    });
  }

  /**
   * Methode reserver a l'adminController
   * Permet d'activer ou desactiver un site
   * Renvoie un boleen pour confirmer la mise a jour
   * @param id du site
   */
  public async toggleStatus(id: number): Promise<UpdateResponse> {
    const site = await this.siteRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        sectors: {
          site: true,
        },
        region: true,
        department: true,
        routeProfiles: true,
        equipment: true,
        expositions: true,
        minLevel: true,
        maxLevel: true,
        approachType: true,
      },
    });
    //Si l'id du site est invalide renvoie une 404
    if (!site) {
      throw new NotFoundException();
    }
    site.isActive = !site.isActive;
    const update = await this.siteRepository.save(site);
    return {
      isUpdated: !!update,
    };
  }
  /**
   * Retrouve un site avec son nom
   * @param name nom du site
   * @private
   */
  private async findByName(name: string): Promise<Site | null> {
    return this.siteRepository.findOneBy({
      name: name,
    });
  }

  public async countAll(): Promise<number> {
    return this.siteRepository.count({
      where: {
        isActive: true,
      },
    });
  }
  public async findLastEntry(): Promise<Site> {
    return this.siteRepository.findOne({
      where: {
        isActive: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }
}
