import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from '../../orm/entity/Site.entity';
import { SiteCreateDto } from '../../dto/SiteCreate.dto';

import { SiteListDto } from '../../dto/SiteList.dto';
import { SiteViewDto } from '../../dto/SiteView.dto';
import { SiteDto } from '../../dto/Site.dto';

@Injectable()
export class SiteService {
  private nameIsUsed = 'Name is used';
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>,
  ) {}

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
  public async findByName(name: string): Promise<Site | null> {
    return this.siteRepository.findOneBy({
      name: name,
    });
  }
  public async create(createSiteDto: SiteCreateDto): Promise<Site> {
    const isExist = await this.findByName(createSiteDto.name);
    if (isExist) {
      throw new HttpException(this.nameIsUsed, HttpStatus.BAD_REQUEST, {
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
      secteurs: createSiteDto.secteurs,
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
      isActive: true,
      createdAt: new Date(),
    });
    site.secteurs.forEach((secteur) => {
      secteur.isActive = true;
      secteur.createdAt = new Date();
    });

    return this.siteRepository.save(site);
  }

  public async findOneById(id: number): Promise<SiteViewDto> {
    const site = await this.siteRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        expositions: true,
        routeProfiles: true,
        maxLevel: true,
        minLevel: true,
        engagement: true,
        equipment: true,
        rockType: true,
        secteurs: {
          routes: true,
        },
        approachType: true,
        region: true,
        department: true,
      },
    });

    if (!site) {
      throw new UnauthorizedException();
    }

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
      secteurs: site.secteurs.map((s) => {
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
    };
  }
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
      secteurs: createSiteDto.secteurs,
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
    entity.secteurs.forEach((s) => {
      if (!s.id) {
        s.createdAt = new Date();
        s.isActive = true;
      }
    });
    return this.siteRepository.save(entity);
  }

  public async findAllForRoute(): Promise<SiteDto[]> {
    const sites = await this.siteRepository.find();
    return sites.map((site) => {
      return {
        id: site.id,
        name: site.name,
      };
    });
  }
}
