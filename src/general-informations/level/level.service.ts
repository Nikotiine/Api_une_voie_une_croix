import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from '../../orm/entity/Level.entity';
import { Repository } from 'typeorm';
import { LevelListDto } from '../../dto/LevelList.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level) private levelRepository: Repository<Level>,
  ) {}
  public async findAll(): Promise<LevelListDto[]> {
    return this.levelRepository.find();
  }
}
