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
    const routeProfiles = await this.routeProfileRepository.find();
    return routeProfiles.map((routeProfile) => {
      return {
        id: routeProfile.id,
        label: routeProfile.label,
      };
    });
  }
}
