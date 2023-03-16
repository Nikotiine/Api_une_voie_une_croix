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
    return this.expositionRepository.find().then((expositions) => {
      const list: ExpositionDto[] = [];
      for (const exposition of expositions) {
        const expositionDto: ExpositionDto = {
          id: exposition.id,
          label: exposition.label,
        };
        list.push(expositionDto);
      }
      return list;
    });
  }
}
