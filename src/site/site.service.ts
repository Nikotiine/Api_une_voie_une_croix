import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from '../orm/entity/Site';
import { SiteCreateDto } from './dto/SiteCreate.dto';
import { ExpositionService } from '../exposition/exposition.service';
import { SiteDataDto } from './dto/SiteData.dto';
import { LevelService } from '../level/level.service';
import { RouteProfileService } from '../route-profile/route-profile.service';
import { RockTypeService } from '../rock-type/rock-type.service';
import { EngagementService } from '../engagement/engagement.service';
import { ApproachTypeService } from '../approach-type/approach-type.service';
import { EquipmentService } from '../equipment/equipment.service';
import { SiteListDto } from './dto/SiteList.dto';
import { SiteViewDto } from './dto/SiteView.dto';
import { RegionService } from '../region/region.service';
import { SecteurService } from '../secteur/secteur.service';

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
    });
    return this.siteRepository.save(entity);
  }
}
