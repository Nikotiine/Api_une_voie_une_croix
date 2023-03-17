import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApproachType } from '../../orm/entity/ApproachType.entity';
import { Repository } from 'typeorm';
import { ApproachTypeDto } from '../../dto/ApproachType.dto';

@Injectable()
export class ApproachTypeService {
  constructor(
    @InjectRepository(ApproachType)
    private approachTypeRepository: Repository<ApproachType>,
  ) {}
  public async findAll(): Promise<ApproachTypeDto[]> {
    const approachTypes = await this.approachTypeRepository.find();
    return approachTypes.map((approachType) => {
      return {
        id: approachType.id,
        label: approachType.label,
      };
    });
  }
}
