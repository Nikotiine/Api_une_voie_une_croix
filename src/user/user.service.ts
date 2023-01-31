import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../orm/entity/User';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/UserRegister.dto';

import { UserProfileDto } from './dto/UserProfile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findUsers() {}
  public createUser(user: UserRegisterDto): Promise<UserProfileDto> {
    const userRegistered = this.userRepository.create({
      firstName: user.fistName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
      createdAt: new Date(),
      isActive: true,
    });

    return this.userRepository
      .save(userRegistered)
      .then((user: User) => {
        const newUser: UserProfileDto = {
          fistName: user.firstName,
          lastName: user.lastName,
          birthday: user.birthday,
          email: user.email,
          id: user.id,
        };
        return newUser;
      })
      .catch((err) => {
        let message = 'Bad Request';
        if (err.errno === 1062) {
          message = 'Email already exist';
        }
        throw new HttpException(message, HttpStatus.BAD_REQUEST, {
          cause: new Error(),
          description: err,
        });
      });
  }
  public findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email: email,
      isActive: true,
    });
  }

  findById(id: number) {
    return this.userRepository
      .findOneBy({
        id: id,
      })
      .then((user) => {
        const userProfile: UserProfileDto = {
          email: user.email,
          fistName: user.firstName,
          lastName: user.lastName,
          birthday: user.birthday,
          id: user.id,
        };
        return userProfile;
      });
  }
}
