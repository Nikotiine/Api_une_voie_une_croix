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
    return this.levelRepository.find().then((levels) => {
      const list: LevelDto[] = [];
      for (const level of levels) {
        const levelDto: LevelDto = {
          id: level.id,
          label: level.label,
        };
        list.push(levelDto);
      }
      return list;
    });
  }
}
