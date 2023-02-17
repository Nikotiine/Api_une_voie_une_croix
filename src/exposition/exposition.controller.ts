import { Controller } from '@nestjs/common';
import { ExpositionService } from './exposition.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Exposition')
@Controller('api/exposition')
export class ExpositionController {
  constructor(private readonly expositionService: ExpositionService) {}
}
