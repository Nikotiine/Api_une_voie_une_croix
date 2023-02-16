import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from '../orm/entity/Region';
import { Repository } from 'typeorm';
import { RegionDto } from './dto/Region.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) {}

  public async findAll(): Promise<RegionDto[]> {
    return this.regionRepository.find();
  }

  async findById(id: number) {
    return this.regionRepository.findOneBy({
      id: id,
    });
  }
}
