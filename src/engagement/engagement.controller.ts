import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EngagementService } from './engagement.service';

@Controller('api/engagement')
@ApiTags('Engagment')
export class EngagementController {
  constructor(private readonly engagementService: EngagementService) {}
}
