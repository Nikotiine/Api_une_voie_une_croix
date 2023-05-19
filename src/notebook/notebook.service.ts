import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notebook } from '../orm/entity/Notebook.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { NotebookCreateDto } from '../dto/NotebookCreate.dto';
import { NotebookViewDto } from '../dto/NotebookView.dto';
import { ErrorMessage } from '../enum/ErrorMessage.enum';
import { RatingRouteDto } from '../dto/RatingRoute.dto';
import { RouteListDto } from '../dto/RouteList.dto';
import { DeleteResponse } from '../dto/ApiResponse.dto';

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
      ranking: notebook.ranking,
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
      ranking: created.ranking,
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

  public async findById(id: number): Promise<NotebookViewDto> {
    return this.notebookRepository.findOne({
      where: {
        id: id,
        isActive: true,
      },
      relations: {
        route: {
          sector: {
            site: true,
          },
          level: true,
          engagement: true,
        },
      },
    });
  }

  public async getAllRatingRoute(): Promise<RatingRouteDto[]> {
    const ratings = await this.notebookRepository.find({
      where: {
        isActive: true,
        ranking: Not(IsNull()),
      },
      relations: {
        route: true,
      },
    });
    return ratings.map((notebook) => {
      return {
        id: notebook.route.id,
        rating: notebook.ranking,
      };
    });
  }

  public async getAllRatingRouteBySite(id: number): Promise<RatingRouteDto[]> {
    const ratings = await this.notebookRepository.find({
      where: {
        isActive: true,
        route: {
          sector: {
            site: {
              id: id,
            },
          },
        },
        ranking: Not(IsNull()),
      },
      relations: {
        route: {
          sector: {
            site: true,
          },
        },
      },
    });

    return ratings.map((notebook) => {
      return {
        id: notebook.route.id,
        rating: notebook.ranking,
      };
    });
  }

  public async getAllRatingRouteByRoute(id: number) {
    const ratings = await this.notebookRepository.find({
      where: {
        isActive: true,
        route: {
          id: id,
        },
        ranking: Not(IsNull()),
      },
      relations: {
        route: true,
      },
    });
    return ratings.map((notebook) => {
      return {
        id: notebook.route.id,
        rating: notebook.ranking,
      };
    });
  }

  public async getLastFiveCheckedRoutes(): Promise<RouteListDto[]> {
    const notebooks = await this.notebookRepository.find({
      where: {
        isActive: true,
      },
      order: {
        id: 'ASC',
      },
      take: 5,
      relations: {
        user: true,
        route: {
          sector: {
            site: true,
          },
          level: true,
          exposition: true,
        },
      },
    });
    return notebooks.map((notebook) => {
      return {
        id: notebook.route.id,
        sector: notebook.route.sector,
        exposition: notebook.route.exposition,
        level: notebook.route.level,
        height: notebook.route.height,
        createdAt: notebook.route.createdAt,
        name: notebook.route.name,
      };
    });
  }

  /**
   * Fonction de suppression d'une voie dans le carnet de croix
   * @param id
   */
  public async remove(id: number): Promise<DeleteResponse> {
    const response = await this.notebookRepository.delete({
      id: id,
    });
    return {
      isDeleted: response.affected > 0,
    };
  }
}
