import { Module } from '@nestjs/common';
import { SiteController } from './site/site.controller';
import { SiteService } from './site/site.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from '../orm/entity/Site.entity';
import { Secteur } from '../orm/entity/Secteur.entity';
import { SecteurController } from './secteur/secteur.controller';
import { SecteurService } from './secteur/secteur.service';
import { GeneralInformationsModule } from '../general-informations/general-informations.module';

import { RouteController } from './route/route.controller';
import { RouteService } from './route/route.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Site, Secteur]),
    GeneralInformationsModule,
  ],
  controllers: [SiteController, SecteurController, RouteController],
  providers: [SiteService, SecteurService, RouteService],
})
export class SiteModule {}
