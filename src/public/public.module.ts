import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { UserModule } from '../user/user.module';
import { SiteModule } from '../site/site.module';
import { NotebookModule } from '../notebook/notebook.module';

@Module({
  controllers: [PublicController],
  providers: [PublicService],
  imports: [UserModule, SiteModule, NotebookModule],
})
export class PublicModule {}
