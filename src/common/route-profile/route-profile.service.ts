import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteProfile } from '../../orm/entity/RouteProfile.entity';
import { Repository } from 'typeorm';
import { RouteProfileDto } from '../../dto/RouteProfile.dto';

@Injectable()
export class RouteProfileService {
  constructor(
    @InjectRepository(RouteProfile)
    private routeProfileRepository: Repository<RouteProfile>,
  ) {}
  public async findAll(): Promise<RouteProfileDto[]> {
    return this.routeProfileRepository.find().then((routeProfiles) => {
      const list: RouteProfileDto[] = [];
      for (const routeProfile of routeProfiles) {
        const routeProfileDto: RouteProfileDto = {
          id: routeProfile.id,
          label: routeProfile.label,
        };
        list.push(routeProfileDto);
      }
      return list;
    });
  }
}
