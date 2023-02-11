import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exposition } from '../orm/entity/Exposition';
import { Repository } from 'typeorm';
import { ExpositionsDto } from './dto/Expositions.dto';

@Injectable()
export class ExpositionService {
  constructor(
    @InjectRepository(Exposition)
    private expositionRepository: Repository<Exposition>,
  ) {}
  public async findAll(): Promise<ExpositionsDto[]> {
    return this.expositionRepository.find();
  }
}
