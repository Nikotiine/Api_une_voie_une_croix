import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../orm/entity/User';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/UserRegister.dto';
import * as bcrypt from 'bcrypt';
import { UserProfileDto } from './dto/UserProfile.dto';
import * as process from 'process';

@Injectable()
export class UserService {
  private salt: number;
  private mailIsUsed = 'Email is already used';
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.salt = parseInt(process.env.BCRYPT_SALT);
  }

  public async createUser(user: UserRegisterDto): Promise<UserProfileDto> {
    const isExist = await this.findByEmail(user.email);
    if (isExist) {
      throw new HttpException(this.mailIsUsed, HttpStatus.BAD_REQUEST, {
        cause: new Error(),
      });
    }
    return bcrypt.hash(user.password, this.salt).then((hash) => {
      const newUser = this.userRepository.create({
        firstName: user.fistName,
        lastName: user.lastName,
        email: user.email,
        password: hash,
        birthday: user.birthday,
        isActive: true,
        createdAt: new Date(),
      });
      return this.userRepository.save(newUser).then((profile) => {
        const userProfile: UserProfileDto = {
          fistName: profile.firstName,
          lastName: profile.lastName,
          birthday: profile.birthday,
          id: profile.id,
          email: profile.email,
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

  public findById(id: number): Promise<UserProfileDto> {
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
  public async edit(user: any): Promise<any> {
    return this.userRepository.update({ id: user.id }, user).then((res) => {
      console.log(res);
    });
  }
}
