import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RockTypeService } from './rock-type.service';
import { RockTypeDto } from './dto/RockType.dto';

@Controller('api/rock-type')
@ApiTags('Rock-type')
export class RockTypeController {
  constructor(private readonly rockTypeService: RockTypeService) {}
  @Get()
  @ApiCreatedResponse({
    type: [RockTypeDto],
    description: 'Return all rock-types',
  })
  public async getAllRockTypes(): Promise<RockTypeDto[]> {
    return this.rockTypeService.findAll();
  }
}
