import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';

import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { DepartmentDataDto } from '../../dto/DepartmentData.dto';
import { DepartmentDto } from '../../dto/Department.dto';

@Controller('api/department')
@ApiTags('Department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('region/:region')
  @ApiCreatedResponse({
    type: [DepartmentDataDto],
    description: 'Return departments by region',
  })
  @ApiParam({
    name: 'region',
    allowEmptyValue: false,
    description: 'id of region where are department',
  })
  @ApiOperation({
    summary: 'Get filtered collection department resource',
    description: 'Filter department with region id',
  })
  public async getByRegion(
    @Param('region') regionId: number,
  ): Promise<DepartmentDataDto[]> {
    return this.departmentService.findByCodeRegion(regionId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all departments',
    description:
      'Retrieve all departments, Please look in DTO for DepartmentDto',
  })
  @ApiCreatedResponse({
    type: [DepartmentDto],
    description: 'Get collection departments resource',
  })
  public async getAllDepartments(): Promise<DepartmentDto[]> {
    return this.departmentService.findAll();
  }
}
