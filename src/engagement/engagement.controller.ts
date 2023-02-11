import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { EngagementService } from './engagement.service';
import { EngagementDto } from './dto/Engagement.dto';

@Controller('api/engagement')
@ApiTags('Engagment')
export class EngagementController {
  constructor(private readonly engagementService: EngagementService) {}

  @Get()
  @ApiCreatedResponse({
    type: [EngagementDto],
    description: 'Return all engagements',
  })
  public async getAllEngagements(): Promise<EngagementDto[]> {
    return this.engagementService.findAll();
  }
}
