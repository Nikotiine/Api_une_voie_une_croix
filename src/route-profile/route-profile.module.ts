import { Module } from '@nestjs/common';
import { RouteProfileService } from './route-profile.service';
import { RouteProfileController } from './route-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteProfile } from '../orm/entity/RouteProfile';

@Module({
  imports: [TypeOrmModule.forFeature([RouteProfile])],
  providers: [RouteProfileService],
  controllers: [RouteProfileController],
  exports: [RouteProfileService],
})
export class RouteProfileModule {}
