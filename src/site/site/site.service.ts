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

import { SiteDataDto } from '../../dto/SiteData.dto';

import { SiteListDto } from '../../dto/SiteList.dto';
import { SiteViewDto } from '../../dto/SiteView.dto';
import { RegionService } from '../../location/region/region.service';
import { ExpositionService } from '../../general-informations/exposition/exposition.service';
import { LevelService } from '../../general-informations/level/level.service';
import { RouteProfileService } from '../../general-informations/route-profile/route-profile.service';
import { RockTypeService } from '../../general-informations/rock-type/rock-type.service';
import { EngagementService } from '../../general-informations/engagement/engagement.service';
import { ApproachTypeService } from '../../general-informations/approach-type/approach-type.service';
import { EquipmentService } from '../../general-informations/equipment/equipment.service';

@Injectable()
export class SiteService {
  private nameIsUsed = 'Name is used';
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>,
    private readonly expositionService: ExpositionService,
    private readonly levelService: LevelService,
    private readonly routeProfileService: RouteProfileService,
    private readonly rockTypeService: RockTypeService,
    private readonly engagementService: EngagementService,
    private readonly approachTypeService: ApproachTypeService,
    private readonly equipmentService: EquipmentService,
    private readonly regionService: RegionService,
  ) {}

  public async findAll(): Promise<SiteListDto[]> {
    return this.siteRepository
      .find({
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
      })
      .then((sites) => {
        const list: SiteListDto[] = [];
        for (let i = 0; i < sites.length; i++) {
          const site: SiteListDto = {
            id: sites[i].id,
            name: sites[i].name,
            expositions: sites[i].expositions,
            averageRouteNumber: sites[i].averageRouteNumber,
            maxLevel: sites[i].maxLevel,
            minLevel: sites[i].minLevel,
            department: sites[i].department,
            region: sites[i].region,
            approachTime: sites[i].approachTime,
            averageRouteHeight: sites[i].averageRouteHeight,
          };
          list.push(site);
        }
        return list;
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

  public async getAllData(): Promise<SiteDataDto> {
    return {
      expositions: await this.expositionService.findAll(),
      levels: await this.levelService.findAll(),
      approachTypes: await this.approachTypeService.findAll(),
      engagements: await this.engagementService.findAll(),
      equipments: await this.equipmentService.findAll(),
      routeProfiles: await this.routeProfileService.findAll(),
      rockTypes: await this.rockTypeService.findAll(),
      regions: await this.regionService.findAll(),
    };
  }

  public async findOneById(id: number) {
    return this.siteRepository
      .findOne({
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
          secteurs: true,
          approachType: true,
          region: true,
          department: true,
        },
      })
      .then((s) => {
        if (!s) {
          throw new UnauthorizedException();
        }
        const site: SiteViewDto = {
          id: s.id,
          name: s.name,
          expositions: s.expositions,
          averageRouteNumber: s.averageRouteNumber,
          minLevel: s.minLevel,
          maxLevel: s.maxLevel,
          department: s.department,
          approachTime: s.approachTime,
          averageRouteHeight: s.averageRouteHeight,
          routeProfiles: s.routeProfiles,
          equipment: s.equipment,
          engagement: s.engagement,
          approachType: s.approachType,
          rockType: s.rockType,
          secteurs: s.secteurs,
          mainParkingLat: s.mainParkingLat,
          mainParkingLng: s.mainParkingLng,
          secondaryParkingLat: s.secondaryParkingLat,
          secondaryParkingLng: s.secondaryParkingLng,
          water: s.water,
          wc: s.wc,
          river: s.river,
          network: s.network,
          region: s.region,
        };
        return site;
      });
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
    console.log(entity);
    return this.siteRepository.save(entity);
  }
}
