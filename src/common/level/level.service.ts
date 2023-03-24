import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from '../../orm/entity/Level.entity';
import { Repository } from 'typeorm';
import { LevelDto } from '../../dto/Level.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level) private levelRepository: Repository<Level>,
  ) {}
  public async findAll(): Promise<LevelDto[]> {
    const levels = await this.levelRepository.find();
    return levels.map((level) => {
      return {
        id: level.id,
        label: level.label,
      };
    });
  }
}
