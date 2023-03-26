import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
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

@Injectable()
export class UserService {
  private salt: number;
  private mailIsUsed = ErrorMessage.USER;
  private invalidPassword = ErrorMessage.WRONG_PASSWORD;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.salt = parseInt(process.env.BCRYPT_SALT);
  }

  public async create(user: UserRegisterDto): Promise<UserProfileDto> {
    const isExist = await this.findByEmail(user.email);
    if (isExist) {
      throw new HttpException(this.mailIsUsed, HttpStatus.BAD_REQUEST, {
        cause: new Error(),
      });
    }
    return bcrypt.hash(user.password, this.salt).then((hash) => {
      const newUser = this.userRepository.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hash,
        birthday: user.birthday,
        isActive: true,
        createdAt: new Date(),
      });
      return this.userRepository.save(newUser).then((profile) => {
        const userProfile: UserProfileDto = {
          firstName: profile.firstName,
          lastName: profile.lastName,
          birthday: profile.birthday,
          id: profile.id,
          email: profile.email,
          role: profile.role,
        };
        return userProfile;
      });
    });
  }
  public findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email: email,
      isActive: true,
    });
  }

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

  public async finAllForAdmin(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async toggleStatus(id: number): Promise<UpdateResponse> {
    console.log(id);
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    user.isActive = !user.isActive;
    user.updatedAt = new Date();
    const update = await this.userRepository.update(id, user);
    return {
      isUpdated: update.affected === 1,
    };
  }

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
    console.log(isExist);
    if (!isExist) {
      throw new UnauthorizedException();
    }
    user.updatedAt = new Date();
    const update = await this.userRepository.update(id, user);
    return {
      isUpdated: update.affected === 1,
    };
  }
}
