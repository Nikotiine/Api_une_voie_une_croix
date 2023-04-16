import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../orm/entity/User.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../dto/UserRegister.dto';
import * as bcrypt from 'bcrypt';
import { UserProfileDto } from '../dto/UserProfile.dto';
import * as process from 'process';
import { UserEditPasswordDto } from '../dto/UserEditPassword.dto';
import { ErrorMessage } from '../enum/ErrorMessage.enum';
import { UpdateResponse } from '../dto/UpdateResponse.dto';
import { AdminUsersDto } from '../dto/AdminUsers.dto';
import { UserContributionDto } from '../dto/UserContribution.dto';

@Injectable()
export class UserService {
  private salt: number;

  private invalidPassword = ErrorMessage.WRONG_PASSWORD;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.salt = parseInt(process.env.BCRYPT_SALT);
  }

  /**
   * Creatiçn d'un nouveau profil utlisateur / Cryptage du mot de passe dans l'entity
   * @param user UserRegisterDto
   */
  public async create(user: UserRegisterDto): Promise<UserProfileDto> {
    const isExist = await this.findByEmail(user.email);
    if (isExist) {
      throw new HttpException(ErrorMessage.USER, HttpStatus.BAD_REQUEST, {
        cause: new Error(),
      });
    }
    const entity = await this.userRepository.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthday: user.birthday,
      password: user.password,
      isActive: true,
    });
    const created = await this.userRepository.save(entity);
    return {
      firstName: created.firstName,
      lastName: created.lastName,
      birthday: created.birthday,
      id: created.id,
      email: created.email,
      role: created.role,
    };
  }
  public findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email: email,
      isActive: true,
    });
  }

  /**
   * trouve le profile de l'utilisateur avec son id
   * @param id de l'utilisateur
   */
  public async findById(id: number): Promise<UserProfileDto> {
    const user = await this.userRepository.findOneBy({
      id: id,
    });
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthday: user.birthday,
      role: user.role,
    };
  }
  public async edit(
    id: number,
    user: UserRegisterDto,
  ): Promise<void | UserProfileDto> {
    return this.userRepository
      .findOneBy({
        id: id,
      })
      .then((u) => {
        return bcrypt.compare(user.password, u.password).then((validate) => {
          if (validate) {
            return this.userRepository
              .update(
                {
                  id: id,
                },
                {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  birthday: user.birthday,
                  updatedAt: new Date(),
                },
              )
              .then((update) => {
                if (update.affected > 0) {
                  return this.findById(id);
                }
              });
          } else {
            throw new HttpException(
              ErrorMessage.WRONG_PASSWORD,
              HttpStatus.UNAUTHORIZED,
              {
                cause: new Error(),
              },
            );
          }
        });
      });
  }

  //TODO : Refact la methode pour enlever le .then
  public async editPassword(
    id: number,
    passwords: UserEditPasswordDto,
  ): Promise<void | UserProfileDto> {
    return this.userRepository
      .findOneBy({
        id: id,
      })
      .then((u) => {
        return bcrypt
          .compare(passwords.oldPassword, u.password)
          .then((validate) => {
            if (validate) {
              return bcrypt
                .hash(passwords.newPassword, this.salt)
                .then((hash) => {
                  return this.userRepository
                    .update(
                      {
                        id: id,
                      },
                      {
                        password: hash,
                      },
                    )
                    .then((update) => {
                      if (update.affected > 0) {
                        return this.findById(id);
                      }
                    });
                });
            } else {
              throw new HttpException(
                this.invalidPassword,
                HttpStatus.UNAUTHORIZED,
                {
                  cause: new Error(),
                },
              );
            }
          });
      });
  }

  // Retrouve tous les utilisateur pour le adminService
  public async finAllForAdmin(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Active ou desactive l'utlisateur / acces uniquement pour adminService
   * @param id de l'utilisateur
   */
  public async toggleStatus(id: number): Promise<UpdateResponse> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      // Si l'id de l'utilisateur est invalide retourne une erreur 404
      throw new NotFoundException();
    }
    user.isActive = !user.isActive;
    user.updatedAt = new Date();
    const update = await this.userRepository.update(id, user);
    return {
      isUpdated: update.affected === 1,
    };
  }

  /**
   * Modifie le role de l'utilisateur / acces uniquement pour adminService
   * @param id de l'utilisateur
   * @param user AdminUserDto
   */
  public async changeUserRole(
    id: number,
    user: AdminUsersDto,
  ): Promise<UpdateResponse> {
    console.log(id);
    const isExist = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!isExist) {
      // Si l'id de l'utilisateur est invalide retourne une erreur 404
      throw new NotFoundException();
    }
    const update = await this.userRepository.update(id, user);
    return {
      isUpdated: update.affected === 1,
    };
  }

  /**
   * Retrouve toute les contribution de l'utlisateur (voie/site/topo)
   * @param id de l'utilisateur
   */
  public async findContributions(id: number): Promise<UserContributionDto> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        sites: true,
        routes: {
          secteur: {
            site: true,
          },
          level: true,
          exposition: true,
        },
      },
    });
    return {
      sites: user.sites.map((s) => {
        return {
          id: s.id,
          name: s.name,
        };
      }),
      routes: user.routes.map((r) => {
        return {
          id: r.id,
          height: r.height,
          name: r.name,
          level: {
            id: r.level.id,
            label: r.level.label,
          },
          createdAt: r.createdAt,
          exposition: {
            id: r.exposition.id,
            label: r.exposition.label,
          },
          secteur: {
            id: r.secteur.id,
            name: r.secteur.name,
            site: {
              id: r.secteur.site.id,
              name: r.secteur.site.name,
            },
          },
        };
      }),
    };
  }
}
