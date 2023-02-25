import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Secteur } from '../orm/entity/Secteur';
import { Repository } from 'typeorm';
import { Site } from '../orm/entity/Site';

@Injectable()
export class SecteurService {
  constructor(
    @InjectRepository(Secteur) private secteurRepository: Repository<Secteur>,
  ) {}

  public async findSecteurBySite(site: Site): Promise<any> {
    return this.secteurRepository.findBy({
      site: site,
    });
  }
}
