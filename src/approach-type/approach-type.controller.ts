import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApproachTypeService } from './approach-type.service';

@Controller('api/approach-type')
@ApiTags('Approach-Type')
export class ApproachTypeController {
  constructor(private readonly approachTypeService: ApproachTypeService) {}
}
