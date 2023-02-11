import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteProfile } from '../orm/entity/RouteProfile';
import { Repository } from 'typeorm';
import { RouteProfileDto } from './dto/RouteProfile.dto';

@Injectable()
export class RouteProfileService {
  constructor(
    @InjectRepository(RouteProfile)
    private routeProfileRepository: Repository<RouteProfile>,
  ) {}
  public async findAll(): Promise<RouteProfileDto[]> {
    return this.routeProfileRepository.find();
  }
}
