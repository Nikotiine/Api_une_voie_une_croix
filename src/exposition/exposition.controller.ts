import { Controller, Get } from '@nestjs/common';
import { ExpositionService } from './exposition.service';
import { ExpositionsDto } from './dto/Expositions.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Exposition')
@Controller('api/exposition')
export class ExpositionController {
  constructor(private readonly expositionService: ExpositionService) {}
  @Get()
  @ApiCreatedResponse({
    type: [ExpositionsDto],
    description: 'List of Expositions',
  })
  public async getAllExpositions(): Promise<ExpositionsDto[]> {
    return this.expositionService.findAll();
  }
}
