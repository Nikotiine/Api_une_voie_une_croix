import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from '../orm/entity/Site';
import { CreateSiteDto } from './dto/CreateSite.dto';
import { ExpositionService } from '../exposition/exposition.service';
import { SiteDataDto } from './dto/SiteData.dto';
import { LevelService } from '../level/level.service';
import { RouteProfileService } from '../route-profile/route-profile.service';
import { RockTypeService } from '../rock-type/rock-type.service';
import { EngagementService } from '../engagement/engagement.service';
import { ApproachTypeService } from '../approach-type/approach-type.service';
import { EquipmentService } from '../equipment/equipment.service';
import { SiteListDto } from './dto/SiteList.dto';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>,
    private readonly expositionService: ExpositionService,
    private readonly levelService: LevelService,
    private readonly routeProfileService: RouteProfileService,
    private readonly rockTypeService: RockTypeService,
    private readonly engagementService: EngagementService,
    private readonly approachTypeService: ApproachTypeService,
    private readonly equipmentService: EquipmentService,
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
        },
      })
      .then((sites) => {
        const list: SiteListDto[] = [];
        for (let i = 0; i < sites.length; i++) {
          console.log(i);
          const site: SiteListDto = {
            id: sites[i].id,
            name: sites[i].name,
            expositions: sites[i].expositions,
            averageRouteNumber: sites[i].averageRouteNumber,
            maxLevel: sites[i].maxLevel,
            minLevel: sites[i].minLevel,
          };
          list.push(site);
        }
        console.log(list);
        return list;
      });
  }
  public async create(createSiteDto: CreateSiteDto) {
    const mainParkingPoint = `POINT(${createSiteDto.mainParkingLng} ${createSiteDto.mainParkingLat})`;
    let secondaryParkingPoint = `POINT(${createSiteDto.secondaryParkingLng} ${createSiteDto.secondaryParkingLat})`;
    if (
      createSiteDto.secondaryParkingLat === 'undefined' &&
      createSiteDto.secondaryParkingLng === 'undefined'
    ) {
      secondaryParkingPoint = mainParkingPoint;
    }

    const site = this.siteRepository.create({
      name: createSiteDto.name,
      approachTime: createSiteDto.approachTime,
      mainParking: mainParkingPoint,
      secondaryParking: secondaryParkingPoint,
      minLevel: createSiteDto.minLevel,
      averageRouteHeight: createSiteDto.averageRouteHeight,
      averageRouteNumber: createSiteDto.averageRouteNumber,
      maxLevel: createSiteDto.maxLevel,
      engagement: createSiteDto.engagement,
      approachType: createSiteDto.approachType,
      equipment: createSiteDto.equipment,
      rockType: createSiteDto.rockType,
      routeProfiles: createSiteDto.routeProfiles,
      expositions: createSiteDto.expositions,
      zipCode: createSiteDto.zipCode,
      regionCode: createSiteDto.regionCode,
      water: createSiteDto.water,
      network: createSiteDto.network,
      wc: createSiteDto.wc,
      river: createSiteDto.river,
      secteurs: createSiteDto.secteurs,
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
    };
  }
}
