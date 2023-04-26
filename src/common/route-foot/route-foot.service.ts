import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteFoot } from '../../orm/entity/RouteFoot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RouteFootService {
  constructor(
    @InjectRepository(RouteFoot)
    private routeFootRepository: Repository<RouteFoot>,
  ) {}

  public async findAll(): Promise<RouteFoot[]> {
    return this.routeFootRepository.find({
      where: {
        isActive: true,
      },
    });
  }
}
