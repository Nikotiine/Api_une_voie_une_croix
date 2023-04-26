import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notebook } from '../orm/entity/Notebook.entity';
import { Repository } from 'typeorm';
import { NotebookCreateDto } from '../dto/NotebookCreate.dto';
import { NotebookViewDto } from '../dto/NotebookView.dto';

@Injectable()
export class NotebookService {
  constructor(
    @InjectRepository(Notebook)
    private notebookRepository: Repository<Notebook>,
  ) {}

  public async create(notebook: NotebookCreateDto): Promise<NotebookViewDto> {
    const entity = await this.notebookRepository.create({
      user: notebook.user,
      succeedAt: notebook.succeedAt,
      commentary: notebook.commentary,
      route: notebook.route,
      trials: notebook.trials,
    });
    return this.notebookRepository.save(entity);
  }
}
