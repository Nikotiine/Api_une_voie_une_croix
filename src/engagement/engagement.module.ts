import { Module } from '@nestjs/common';
import { EngagementService } from './engagement.service';
import { EngagementController } from './engagement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Engagement } from '../orm/entity/Engagement';

@Module({
  imports: [TypeOrmModule.forFeature([Engagement])],
  providers: [EngagementService],
  controllers: [EngagementController],
})
export class EngagementModule {}
