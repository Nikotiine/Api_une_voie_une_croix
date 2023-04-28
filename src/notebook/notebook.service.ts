import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notebook } from '../orm/entity/Notebook.entity';
import { Repository } from 'typeorm';
import { NotebookCreateDto } from '../dto/NotebookCreate.dto';
import { NotebookViewDto } from '../dto/NotebookView.dto';
import { UserProfileDto } from '../dto/UserProfile.dto';
import { RouteViewDto } from '../dto/RouteView.dto';
import { ErrorMessage } from '../enum/ErrorMessage.enum';

@Injectable()
export class NotebookService {
  constructor(
    @InjectRepository(Notebook)
    private notebookRepository: Repository<Notebook>,
  ) {}

  public async create(notebook: NotebookCreateDto): Promise<NotebookViewDto> {
    const isExist = await this.notebookRepository.findOne({
      where: {
        user: {
          id: notebook.user.id,
        },
        route: {
          id: notebook.route.id,
        },
      },
      relations: {
        user: true,
        route: true,
      },
    });
    if (isExist) {
      throw new HttpException(
        ErrorMessage.NOTEBOOK_EXIST,
        HttpStatus.UNAUTHORIZED,
        {
          cause: new Error(),
        },
      );
    }
    const entity = await this.notebookRepository.create({
      user: notebook.user,
      succeedAt: notebook.succeedAt,
      commentary: notebook.commentary,
      route: notebook.route,
      trials: notebook.trials,
      achievementType: notebook.achievementType,
    });
    const created = await this.notebookRepository.save(entity);
    return {
      id: created.id,
      trials: created.trials,
      user: created.user,
      achievementType: created.achievementType,
      route: created.route,
      commentary: created.commentary,
      succeedAt: created.succeedAt,
    };
  }

  public async findAllActiveByUser(userId: number): Promise<NotebookViewDto[]> {
    return this.notebookRepository.find({
      where: {
        isActive: true,
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
        route: {
          sector: {
            site: true,
          },
          level: true,
        },
      },
    });
  }
}
