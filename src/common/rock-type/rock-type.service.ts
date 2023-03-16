import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RockType } from '../../orm/entity/RockType.entity';
import { Repository } from 'typeorm';
import { RockTypeDto } from '../../dto/RockType.dto';

@Injectable()
export class RockTypeService {
  constructor(
    @InjectRepository(RockType)
    private rockTypeRepository: Repository<RockType>,
  ) {}
  public async findAll(): Promise<RockTypeDto[]> {
    return this.rockTypeRepository.find().then((rockTypes) => {
      const list: RockTypeDto[] = [];
      for (const rockType of rockTypes) {
        const rockTypeDto: RockTypeDto = {
          id: rockType.id,
          label: rockType.label,
        };
        list.push(rockTypeDto);
      }
      return list;
    });
  }
}
