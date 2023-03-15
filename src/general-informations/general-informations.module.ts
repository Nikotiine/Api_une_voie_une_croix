import { Module } from '@nestjs/common';
import { RouteProfileController } from './route-profile/route-profile.controller';
import { RouteProfileService } from './route-profile/route-profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteProfile } from '../orm/entity/RouteProfile.entity';
import { EngagementController } from './engagement/engagement.controller';
import { EngagementService } from './engagement/engagement.service';
import { Engagement } from '../orm/entity/Engagement.entity';
import { EquipmentController } from './equipment/equipment.controller';
import { EquipmentService } from './equipment/equipment.service';
import { Equipment } from '../orm/entity/Equipment.entity';
import { ExpositionController } from './exposition/exposition.controller';
import { ExpositionService } from './exposition/exposition.service';
import { Exposition } from '../orm/entity/Exposition.entity';
import { LevelController } from './level/level.controller';
import { LevelService } from './level/level.service';
import { Level } from '../orm/entity/Level.entity';
import { RockTypeService } from './rock-type/rock-type.service';
import { RockTypeController } from './rock-type/rock-type.controller';
import { ApproachTypeController } from './approach-type/approach-type.controller';
import { ApproachTypeService } from './approach-type/approach-type.service';
import { ApproachType } from '../orm/entity/ApproachType.entity';
import { RockType } from '../orm/entity/RockType.entity';
import { Department } from '../orm/entity/Department.entity';
import { Region } from '../orm/entity/Region.entity';
import { DepartmentService } from './department/department.service';
import { RegionService } from './region/region.service';
import { DepartmentController } from './department/department.controller';
import { RegionController } from './region/region.controller';

@Module({
  controllers: [
    RouteProfileController,
    EngagementController,
    EquipmentController,
    ExpositionController,
    LevelController,
    RockTypeController,
    ApproachTypeController,
    DepartmentController,
    RegionController,
  ],
  providers: [
    RouteProfileService,
    EngagementService,
    EquipmentService,
    ExpositionService,
    LevelService,
    RockTypeService,
    ApproachTypeService,
    DepartmentService,
    RegionService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      RouteProfile,
      Engagement,
      Equipment,
      Exposition,
      Level,
      ApproachType,
      RockType,
      Department,
      Region,
    ]),
  ],
  exports: [
    RouteProfileService,
    EngagementService,
    EquipmentService,
    ExpositionService,
    LevelService,
    RockTypeService,
    ApproachTypeService,
    DepartmentService,
    RegionService,
  ],
})
export class GeneralInformationsModule {}
