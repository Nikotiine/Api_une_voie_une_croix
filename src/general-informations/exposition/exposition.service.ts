import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exposition } from '../../orm/entity/Exposition.entity';
import { Repository } from 'typeorm';
import { ExpositionListDto } from '../../dto/ExpositionList.dto';

@Injectable()
export class ExpositionService {
  constructor(
    @InjectRepository(Exposition)
    private expositionRepository: Repository<Exposition>,
  ) {}
  public async findAll(): Promise<ExpositionListDto[]> {
    return this.expositionRepository.find();
  }
}
