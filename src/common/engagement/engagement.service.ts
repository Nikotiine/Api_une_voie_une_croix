import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Engagement } from '../../orm/entity/Engagement.entity';
import { Repository } from 'typeorm';
import { EngagementDto } from '../../dto/Engagement.dto';

@Injectable()
export class EngagementService {
  constructor(
    @InjectRepository(Engagement)
    private engagementRepository: Repository<Engagement>,
  ) {}

  public async findAll(): Promise<EngagementDto[]> {
    return this.engagementRepository.find().then((engagements) => {
      const list: EngagementDto[] = [];
      for (const engagement of engagements) {
        const engagementDto: EngagementDto = {
          id: engagement.id,
          label: engagement.label,
        };
        list.push(engagementDto);
      }
      return list;
    });
  }
}
