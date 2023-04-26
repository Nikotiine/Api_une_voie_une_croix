import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { UserModule } from '../user/user.module';
import { SiteModule } from '../site/site.module';

@Module({
  controllers: [PublicController],
  providers: [PublicService],
  imports: [UserModule, SiteModule],
})
export class PublicModule {}
