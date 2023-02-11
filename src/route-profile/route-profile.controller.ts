import { Controller, Get } from '@nestjs/common';

import { RouteProfileDto } from './dto/RouteProfile.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RouteProfileService } from './route-profile.service';

@Controller('api/route-profile')
@ApiTags('Route-Profile')
export class RouteProfileController {
  constructor(private readonly routeProfileService: RouteProfileService) {}
  @Get()
  @ApiCreatedResponse({
    type: [RouteProfileDto],
    description: 'Return all route profile',
  })
  public async getAllRouteProfile(): Promise<RouteProfileDto[]> {
    return this.routeProfileService.findAll();
  }
}
