import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from '../../orm/entity/Sector.entity';
import { Repository } from 'typeorm';
import { SectorDto } from '../../dto/Sector.dto';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector) private SectorRepository: Repository<Sector>,
  ) {}

  public async findSectorsBySite(siteId: number): Promise<SectorDto[]> {
    return this.SectorRepository.find({
      where: {
        site: {
          id: siteId,
        },
      },
    });
  }
}
