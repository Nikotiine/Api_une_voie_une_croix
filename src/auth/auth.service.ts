import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCredentialsDto } from './dto/UserCredentials.dto';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from '../user/dto/UserRegister.dto';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { JwtService } from '@nestjs/jwt';
import { UserProfileDto } from '../user/dto/UserProfile.dto';
import { User } from '../orm/entity/User';
import { TokenDto } from './dto/Token.dto';
@Injectable()
export class AuthService {
  private salt: number;
  private errorMessage = 'Invalid credentials';
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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
    //return this.login(user);
  }
  async generateToken(user: User): Promise<TokenDto> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public register(userRegister: UserRegisterDto): Promise<UserProfileDto> {
    return bcrypt.hash(userRegister.password, this.salt).then((hash) => {
      userRegister.password = hash;
      return this.userService.createUser(userRegister);
    });
  }
  public getProfile(id: number): Promise<UserProfileDto> {
    return this.userService.findById(id);
  }
}
