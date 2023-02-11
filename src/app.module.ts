import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './orm/entity/User';
import { AuthModule } from './auth/auth.module';
import { Site } from './orm/entity/Site';
import { Exposition } from './orm/entity/Exposition';
import { RouteProfile } from './orm/entity/RouteProfile';
import { Level } from './orm/entity/Level';
import { ApproachType } from './orm/entity/ApproachType';
import { Equipment } from './orm/entity/Equipment';
import { Engagement } from './orm/entity/Engagement';
import { RockType } from './orm/entity/RockType';
import { Secteur } from './orm/entity/Secteur';
import { SiteModule } from './site/site.module';
import { ExpositionModule } from './exposition/exposition.module';
import { LevelModule } from './level/level.module';
import { RockTypeModule } from './rock-type/rock-type.module';
import { RouteProfileModule } from './route-profile/route-profile.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EngagementModule } from './engagement/engagement.module';
import { ApproachTypeModule } from './approach-type/approach-type.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      legacySpatialSupport: false,
      password: '',
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Site,
        Exposition,
        RouteProfile,
        Level,
        ApproachType,
        Equipment,
        Engagement,
        RockType,
        Secteur,
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    SiteModule,
    ExpositionModule,
    LevelModule,
    RockTypeModule,
    RouteProfileModule,
    EquipmentModule,
    EngagementModule,
    ApproachTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
