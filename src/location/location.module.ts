import { Module } from '@nestjs/common';
import { DepartmentController } from './department/department.controller';
import { RegionController } from './region/region.controller';
import { DepartmentService } from './department/department.service';
import { RegionService } from './region/region.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../orm/entity/Department.entity';
import { Region } from '../orm/entity/Region.entity';

@Module({
  controllers: [DepartmentController, RegionController],
  providers: [DepartmentService, RegionService],
  imports: [TypeOrmModule.forFeature([Department, Region])],
  exports: [DepartmentService, RegionService],
})
export class LocationModule {}
