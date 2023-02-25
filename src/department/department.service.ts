import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../orm/entity/Department';
import { Repository } from 'typeorm';
import { RegionService } from '../region/region.service';
import { DepartmentDto } from './dto/Department.dto';

@Injectable()
export class DepartmentService {
  private invalidId = 'Invalid region ID';
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    private regionService: RegionService,
  ) {}

  public async findByCodeRegion(regionId: number): Promise<DepartmentDto[]> {
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
