import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/equipment')
@ApiTags('Equipment')
export class EquipmentController {}
