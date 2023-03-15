import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../../orm/entity/Route.entity';
import { Repository } from 'typeorm';
import { RouteCreateDto } from '../../dto/RouteCreate.dto';
import { ErrorMessage } from '../../enum/ErrorMessage.enum';
import { RouteListDto } from '../../dto/RouteList.dto';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route) private routeRepository: Repository<Route>,
  ) {}

  public async create(routeCreate: RouteCreateDto): Promise<RouteListDto> {
    const isExist = await this.findByName(routeCreate.name);
    if (isExist) {
      throw new HttpException(ErrorMessage.ROUTE, HttpStatus.BAD_REQUEST, {
        cause: new Error(),
      });
    }
    const route = await this.routeRepository.create({
      name: routeCreate.name,
      height: routeCreate.height,
      quickdraw: routeCreate.quickdraw,
      isActive: true,
      createdAt: new Date(),
      engagement: routeCreate.engagement,
      equipment: routeCreate.equipment,
      secteur: routeCreate.secteur,
      level: routeCreate.level,
    });
    return this.routeRepository.save(route);
  }

  private async findByName(name: string): Promise<Route> {
    return this.routeRepository.findOneBy({
      name: name,
    });
  }

  public async findAll(): Promise<RouteListDto[]> {
    return this.routeRepository.find({
      relations: {
        equipment: true,
        engagement: true,
        secteur: {
          site: true,
        },
        level: true,
      },
    });
  }

  public async findById(id: number): Promise<RouteListDto> {
    return this.routeRepository
      .findOne({
        where: {
          id: id,
        },
        relations: {
          equipment: true,
          engagement: true,
          secteur: {
            site: true,
          },
          level: true,
        },
      })
      .then((r) => {
        if (!r) {
          throw new UnauthorizedException();
        }
        return r;
      });
  }
}
