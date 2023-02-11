import { Module } from '@nestjs/common';
import { RockTypeService } from './rock-type.service';
import { RockTypeController } from './rock-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RockType } from '../orm/entity/RockType';

@Module({
  imports: [TypeOrmModule.forFeature([RockType])],
  providers: [RockTypeService],
  controllers: [RockTypeController],
})
export class RockTypeModule {}
