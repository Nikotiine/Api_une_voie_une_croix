import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApproachTypeService } from './approach-type.service';
import { ApproachTypeDto } from './dto/ApproachType.dto';

@Controller('api/approach-type')
@ApiTags('Approach-Type')
export class ApproachTypeController {
  constructor(private readonly approachTypeService: ApproachTypeService) {}
  @Get()
  @ApiCreatedResponse({
    type: [ApproachTypeDto],
    description: 'Return list of all approach-type',
  })
  public async getAllApproachTypes(): Promise<ApproachTypeDto[]> {
    return this.approachTypeService.findAll();
  }
}
