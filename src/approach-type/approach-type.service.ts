import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApproachType } from '../orm/entity/ApproachType';
import { Repository } from 'typeorm';
import { ApproachTypeDto } from './dto/ApproachType.dto';

@Injectable()
export class ApproachTypeService {
  constructor(
    @InjectRepository(ApproachType)
    private approachTypeRepository: Repository<ApproachType>,
  ) {}
  public async findAll(): Promise<ApproachTypeDto[]> {
    return this.approachTypeRepository.find();
  }
}
