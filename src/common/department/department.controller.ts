import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';

import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { DepartmentDto } from '../../dto/Department.dto';

@Controller('api/department')
@ApiTags('Department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get(':region')
  @ApiCreatedResponse({
    type: [DepartmentDto],
    description: 'Return depart by region',
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
  public async findByRegion(
    @Param('region') regionId: number,
  ): Promise<DepartmentDto[]> {
    return this.departmentService.findByCodeRegion(regionId);
  }
}
