import { Module } from '@nestjs/common';
import { SecteurService } from './secteur.service';
import { SecteurController } from './secteur.controller';

@Module({
  providers: [SecteurService],
  controllers: [SecteurController]
})
export class SecteurModule {}
