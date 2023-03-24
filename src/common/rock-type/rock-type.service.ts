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
    const rockTypes = await this.rockTypeRepository.find();
    return rockTypes.map((rockType) => {
      return {
        id: rockType.id,
        label: rockType.label,
      };
    });
  }
}
