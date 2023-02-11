import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from '../orm/entity/Site';
import { CreateSiteDto } from './dto/CreateSite.dto';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>,
  ) {}

  public async findAll() {
    return this.siteRepository.find({
      where: {
        isActive: true,
      },
    });
  }
  public async create(createSiteDto: CreateSiteDto) {
    const mainParkingPoint = `POINT(${createSiteDto.mainParkingLng} ${createSiteDto.mainParkingLat})`;
    const secondaryParkingPoint = `POINT(${createSiteDto.secondaryParkingLng} ${createSiteDto.secondaryParkingLat})`;
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
    });
    console.log(site);
    return this.siteRepository.save(site);
  }
}
