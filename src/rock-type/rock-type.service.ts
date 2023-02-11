import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RockType } from '../orm/entity/RockType';
import { Repository } from 'typeorm';
import { RockTypeDto } from './dto/RockType.dto';

@Injectable()
export class RockTypeService {
  constructor(
    @InjectRepository(RockType)
    private rockTypeRepository: Repository<RockType>,
  ) {}
  public async findAll(): Promise<RockTypeDto[]> {
    return this.rockTypeRepository.find();
  }
}
