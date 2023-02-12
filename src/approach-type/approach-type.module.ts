import { Module } from '@nestjs/common';
import { ApproachTypeService } from './approach-type.service';
import { ApproachTypeController } from './approach-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApproachType } from '../orm/entity/ApproachType';

@Module({
  imports: [TypeOrmModule.forFeature([ApproachType])],
  providers: [ApproachTypeService],
  controllers: [ApproachTypeController],
  exports: [ApproachTypeService],
})
export class ApproachTypeModule {}
