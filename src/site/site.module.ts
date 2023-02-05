import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from '../orm/entity/Site';

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
