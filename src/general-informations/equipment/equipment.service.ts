import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from '../../orm/entity/Equipment.entity';
import { Repository } from 'typeorm';

import { EquipmentListDto } from '../../dto/EquipmentList.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
  ) {}
  public async findAll(): Promise<EquipmentListDto[]> {
    return this.equipmentRepository.find();
  }
}
