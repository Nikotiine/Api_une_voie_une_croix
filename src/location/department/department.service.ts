import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../../orm/entity/Department.entity';
import { Repository } from 'typeorm';
import { RegionService } from '../region/region.service';

import { DepartmentListDto } from '../dto/DepartmentList.dto';

@Injectable()
export class DepartmentService {
  private invalidId = 'Invalid region ID';
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    private regionService: RegionService,
  ) {}

  public async findByCodeRegion(
    regionId: number,
  ): Promise<DepartmentListDto[]> {
    const region = await this.regionService.findById(regionId);
    if (!region) {
      throw new HttpException(this.invalidId, HttpStatus.BAD_REQUEST, {
        cause: new Error(),
      });
    }
    return this.departmentRepository.find({
      where: {
        region: region,
      },
    });
  }
}
