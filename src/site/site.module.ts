import { Module } from '@nestjs/common';
import { SiteController } from './site/site.controller';
import { SiteService } from './site/site.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from '../orm/entity/Site.entity';
import { Sector } from '../orm/entity/Sector.entity';

import { RouteController } from './route/route.controller';
import { RouteService } from './route/route.service';
import { Route } from '../orm/entity/Route.entity';
import { SectorController } from './sector/sector.controller';
import { SectorService } from './sector/sector.service';

@Module({
  imports: [TypeOrmModule.forFeature([Site, Sector, Route])],
  controllers: [SiteController, SectorController, RouteController],
  providers: [SiteService, SectorService, RouteService],
  exports: [SiteService, RouteService, SectorService],
})
export class SiteModule {}
