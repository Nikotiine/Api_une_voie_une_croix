import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RockType } from '../../orm/entity/RockType.entity';
import { Repository } from 'typeorm';
import { RockTypeListDto } from '../../dto/RockTypeList.dto';

@Injectable()
export class RockTypeService {
  constructor(
    @InjectRepository(RockType)
    private rockTypeRepository: Repository<RockType>,
  ) {}
  public async findAll(): Promise<RockTypeListDto[]> {
    return this.rockTypeRepository.find();
  }
}
