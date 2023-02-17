import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EquipmentService } from './equipment.service';

@Controller('api/equipment')
@ApiTags('Equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}
}
