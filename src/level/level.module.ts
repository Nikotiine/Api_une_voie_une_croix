import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from '../orm/entity/Level';

@Module({
  imports: [TypeOrmModule.forFeature([Level])],
  providers: [LevelService],
  controllers: [LevelController],
})
export class LevelModule {}
