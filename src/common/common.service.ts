import { Injectable } from '@nestjs/common';
import { ApproachTypeService } from './approach-type/approach-type.service';
import { DepartmentService } from './department/department.service';
import { RegionService } from './region/region.service';
import { EngagementService } from './engagement/engagement.service';
import { ExpositionService } from './exposition/exposition.service';
import { LevelService } from './level/level.service';
import { RockTypeService } from './rock-type/rock-type.service';
import { RouteProfileService } from './route-profile/route-profile.service';
import { DataSiteDto } from '../dto/DataSite.dto';
import { EquipmentService } from './equipment/equipment.service';
import { DataRouteDto } from '../dto/DataRoute.dto';

@Injectable()
export class CommonService {
  constructor(
    private readonly approachTypeService: ApproachTypeService,
    private readonly departmentService: DepartmentService,
    private readonly regionService: RegionService,
    private readonly engagementService: EngagementService,
    private readonly expositionService: ExpositionService,
    private readonly levelService: LevelService,
    private readonly rockTypeService: RockTypeService,
    private readonly routeProfileService: RouteProfileService,
    private readonly equipmentService: EquipmentService,
  ) {}
  public async findDataForSite(): Promise<DataSiteDto> {
    const data = await this.findDataForRoute();
    return {
      ...data,
      approachTypes: await this.approachTypeService.findAll(),
      rockTypes: await this.rockTypeService.findAll(),
      regions: await this.regionService.findAll(),
    };
  }
  public async findDataForRoute(): Promise<DataRouteDto> {
    return {
      expositions: await this.expositionService.findAll(),
      levels: await this.levelService.findAll(),
      routeProfiles: await this.routeProfileService.findAll(),
      engagements: await this.engagementService.findAll(),
      equipments: await this.equipmentService.findAll(),
    };
  }
}
