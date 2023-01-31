import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../orm/entity/User';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/UserRegister.dto';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { UserProfileDto } from './dto/UserProfile.dto';
import { UserCredentialsDto } from './dto/UserCredentials.dto';

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
          isActive: user.isActive,
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
  public findOne(email: string): Promise<UserCredentialsDto | null> {
    return this.userRepository
      .findOneBy({
        email: email,
        isActive: true,
      })
      .then((user) => {
        const crendential: UserCredentialsDto = {
          email: user.email,
          password: user.password,
        };
        return crendential;
      });
  }
}
