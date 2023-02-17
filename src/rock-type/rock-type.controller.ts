import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RockTypeService } from './rock-type.service';

@Controller('api/rock-type')
@ApiTags('Rock-type')
export class RockTypeController {
  constructor(private readonly rockTypeService: RockTypeService) {}
}
