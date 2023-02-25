import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from '../orm/entity/Site';
import { ExpositionModule } from '../exposition/exposition.module';
import { RouteProfileModule } from '../route-profile/route-profile.module';
import { RockTypeModule } from '../rock-type/rock-type.module';
import { EngagementModule } from '../engagement/engagement.module';
import { EquipmentModule } from '../equipment/equipment.module';
import { LevelModule } from '../level/level.module';
import { ApproachTypeModule } from '../approach-type/approach-type.module';

import { RegionModule } from '../region/region.module';
import { SecteurModule } from '../secteur/secteur.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Site]),
    ExpositionModule,
    RouteProfileModule,
    RockTypeModule,
    EngagementModule,
    EquipmentModule,
    LevelModule,
    ApproachTypeModule,
    RegionModule,
  ],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
