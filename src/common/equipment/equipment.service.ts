import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from '../../orm/entity/Equipment.entity';
import { Repository } from 'typeorm';

import { EquipmentDto } from '../../dto/Equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
  ) {}
  public async findAll(): Promise<EquipmentDto[]> {
    const equipments = await this.equipmentRepository.find();
    return equipments.map((equipment) => {
      return {
        id: equipment.id,
        label: equipment.label,
      };
    });
  }
}
