import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExpositionService } from './exposition.service';

@ApiTags('Exposition')
@Controller('api/exposition')
export class ExpositionController {
  constructor(private readonly expositionService: ExpositionService) {}
}
