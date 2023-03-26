import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';

import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { JwtService } from '@nestjs/jwt';
import { UserProfileDto } from '../dto/UserProfile.dto';
import { User } from '../orm/entity/User.entity';
import { TokenDto } from '../dto/Token.dto';
@Injectable()
export class AuthService {
  private salt: number;
  private errorMessage = 'Invalid credentials';
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.salt = parseInt(process.env.BCRYPT_SALT);
  }
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException(this.errorMessage, HttpStatus.BAD_REQUEST, {
        cause: new Error(),
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException(this.errorMessage, HttpStatus.BAD_REQUEST, {
        cause: new Error(),
      });
    }
    return user;
  }
  async generateToken(user: User): Promise<TokenDto> {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public getProfile(id: number): Promise<UserProfileDto> {
    return this.userService.findById(id);
  }
}
