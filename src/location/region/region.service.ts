import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from '../../orm/entity/Region.entity';
import { Repository } from 'typeorm';
import { RegionListDto } from '../dto/RegionList.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) {}

  public async findAll(): Promise<RegionListDto[]> {
    return this.regionRepository.find();
  }

  async findById(id: number) {
    return this.regionRepository.findOneBy({
      id: id,
    });
  }
}
