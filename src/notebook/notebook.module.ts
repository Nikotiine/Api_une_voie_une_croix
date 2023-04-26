import { Module } from '@nestjs/common';
import { NotebookController } from './notebook.controller';
import { NotebookService } from './notebook.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notebook } from '../orm/entity/Notebook.entity';

@Module({
  controllers: [NotebookController],
  providers: [NotebookService],
  imports: [TypeOrmModule.forFeature([Notebook])],
})
export class NotebookModule {}
