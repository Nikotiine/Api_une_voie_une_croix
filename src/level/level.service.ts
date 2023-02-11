import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from '../orm/entity/Level';
import { Repository } from 'typeorm';
import { LevelsDto } from './dto/Levels.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level) private levelRepository: Repository<Level>,
  ) {}
  public async findAll(): Promise<LevelsDto[]> {
    return this.levelRepository.find();
  }
}
