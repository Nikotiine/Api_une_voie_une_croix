import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exposition } from '../../orm/entity/Exposition.entity';
import { Repository } from 'typeorm';
import { ExpositionDto } from '../../dto/Exposition.dto';

@Injectable()
export class ExpositionService {
  constructor(
    @InjectRepository(Exposition)
    private expositionRepository: Repository<Exposition>,
  ) {}
  public async findAll(): Promise<ExpositionDto[]> {
    const expositions = await this.expositionRepository.find();
    return expositions.map((exposition) => {
      return {
        id: exposition.id,
        label: exposition.label,
      };
    });
  }
}
