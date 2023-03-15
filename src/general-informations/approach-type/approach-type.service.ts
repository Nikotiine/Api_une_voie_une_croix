import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApproachType } from '../../orm/entity/ApproachType.entity';
import { Repository } from 'typeorm';
import { ApproachTypeListDto } from '../../dto/ApproachTypeList.dto';

@Injectable()
export class ApproachTypeService {
  constructor(
    @InjectRepository(ApproachType)
    private approachTypeRepository: Repository<ApproachType>,
  ) {}
  public async findAll(): Promise<ApproachTypeListDto[]> {
    return this.approachTypeRepository.find();
  }
}
