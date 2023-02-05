import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from '../orm/entity/Site';
import { CreateSiteDto } from './dto/CreateSite.dto';
import { Point } from 'geojson';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>,
  ) {}

  public async getAll() {
    return this.siteRepository.find({
      where: {
        isActive: true,
      },
    });
  }
  public async create(createSiteDto: CreateSiteDto) {
    const point = `POINT(${createSiteDto.longitudeP1} ${createSiteDto.latitudeP1})`;
    const site = this.siteRepository.create({
      name: createSiteDto.name,
      approachTime: createSiteDto.approachTime,
      location: point,
      averageRouteHeight: createSiteDto.averageRouteHeight,
      averageRouteNumber: createSiteDto.averageRouteNumber,
    });
    console.log(site);
    return this.siteRepository.save(site);
  }
}
