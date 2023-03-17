import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from '../../orm/entity/Region.entity';
import { Repository } from 'typeorm';
import { RegionDto } from '../../dto/Region.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) {}

  public async findAll(): Promise<RegionDto[]> {
    const regions = await this.regionRepository.find();
    return regions.map((region) => {
      return {
        id: region.id,
        name: region.name,
      };
    });
  }

  async findById(id: number) {
    return this.regionRepository.findOneBy({
      id: id,
    });
  }
}
