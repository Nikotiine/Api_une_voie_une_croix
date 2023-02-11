import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { EquipmentDto } from './dto/Equipment.dto';
import { EquipmentService } from './equipment.service';

@Controller('api/equipment')
@ApiTags('Equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}
  @Get()
  @ApiCreatedResponse({
    type: [EquipmentDto],
    description: 'List of all equipments',
  })
  public async getAllEquipments(): Promise<EquipmentDto[]> {
    return this.equipmentService.findAll();
  }
}
