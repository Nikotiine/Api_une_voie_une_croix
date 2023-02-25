import { Module } from '@nestjs/common';
import { SecteurService } from './secteur.service';
import { SecteurController } from './secteur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Secteur } from '../orm/entity/Secteur';

@Module({
  providers: [SecteurService],
  controllers: [SecteurController],
  imports: [TypeOrmModule.forFeature([Secteur])],
})
export class SecteurModule {}
