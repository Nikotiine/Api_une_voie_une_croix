import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../orm/entity/User';
import { Repository } from 'typeorm';
import { UserDto } from '../../dto/User.dto';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { UserRegisterDto } from '../../dto/UserRegister.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findUsers() {}
  createUser(userDetail: UserRegisterDto): Promise<UserDto> {
    const salt = parseInt(process.env.BCRYPT_SALT);
    return bcrypt.hash(userDetail.password, salt).then((hash: string) => {
      const user = this.userRepository.create({
        firstName: userDetail.fistName,
        lastName: userDetail.lastName,
        email: userDetail.email,
        password: hash,
        birthday: userDetail.birthday,
        createdAt: new Date(),
        isActive: true,
      });

      return this.userRepository
        .save(user)
        .then((user: User) => {
          const newUser: UserDto = {
            fistName: user.firstName,
            lastName: user.lastName,
            birthday: user.birthday,
            email: user.email,
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
    });
  }
}
