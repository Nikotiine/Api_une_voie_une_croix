import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SiteModule } from './site/site.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { CommonModule } from './common/common.module';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';
import { NotebookModule } from './notebook/notebook.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    AuthModule,
    SiteModule,
    CommonModule,
    AdminModule,
    PublicModule,
    NotebookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
