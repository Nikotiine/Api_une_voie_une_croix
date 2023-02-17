import { Controller } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { RouteProfileService } from './route-profile.service';

@Controller('api/route-profile')
@ApiTags('Route-Profile')
export class RouteProfileController {
  constructor(private readonly routeProfileService: RouteProfileService) {}
}
