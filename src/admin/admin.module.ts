import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from '../user/user.module';
import { SiteModule } from '../site/site.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [UserModule, SiteModule],
})
export class AdminModule {}
