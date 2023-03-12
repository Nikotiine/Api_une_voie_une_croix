import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Engagement } from '../../orm/entity/Engagement.entity';
import { Repository } from 'typeorm';
import { EngagementListDto } from '../dto/EngagementList.dto';

@Injectable()
export class EngagementService {
  constructor(
    @InjectRepository(Engagement)
    private engagementRepository: Repository<Engagement>,
  ) {}

  public async findAll(): Promise<EngagementListDto[]> {
    return this.engagementRepository.find();
  }
}
