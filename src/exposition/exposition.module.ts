import { Module } from '@nestjs/common';
import { ExpositionService } from './exposition.service';
import { ExpositionController } from './exposition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exposition } from '../orm/entity/Exposition';

@Module({
  imports: [TypeOrmModule.forFeature([Exposition])],
  providers: [ExpositionService],
  controllers: [ExpositionController],
  exports: [ExpositionService],
})
export class ExpositionModule {}
