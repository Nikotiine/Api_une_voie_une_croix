import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteProfile } from '../../orm/entity/RouteProfile.entity';
import { Repository } from 'typeorm';
import { RouteProfileListDto } from '../../dto/RouteProfileList.dto';

@Injectable()
export class RouteProfileService {
  constructor(
    @InjectRepository(RouteProfile)
    private routeProfileRepository: Repository<RouteProfile>,
  ) {}
  public async findAll(): Promise<RouteProfileListDto[]> {
    return this.routeProfileRepository.find();
  }
}
