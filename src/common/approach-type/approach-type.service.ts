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
    return this.approachTypeRepository.find().then((approachType) => {
      const list: ApproachTypeDto[] = [];
      for (const approach of approachType) {
        const approachTypeDto: ApproachTypeDto = {
          id: approach.id,
          label: approach.label,
        };
        list.push(approachTypeDto);
      }
      return list;
    });
  }
}
