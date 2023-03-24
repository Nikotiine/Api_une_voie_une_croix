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
    const engagements = await this.engagementRepository.find();
    return engagements.map((engagement) => {
      return {
        id: engagement.id,
        label: engagement.label,
      };
    });
  }
}
