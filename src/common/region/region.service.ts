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
    return this.regionRepository.find().then((regions) => {
      const list: RegionDto[] = [];
      for (const region of regions) {
        const regionDto: RegionDto = {
          id: region.id,
          name: region.name,
        };
        list.push(regionDto);
      }
      return list;
    });
  }

  async findById(id: number) {
    return this.regionRepository.findOneBy({
      id: id,
    });
  }
}
