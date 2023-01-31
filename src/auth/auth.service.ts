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
  async validateUser(userCredential: UserCredentialsDto): Promise<TokenDto> {
    const user = await this.userService.findOne(userCredential.email);
    console.log(user);
    if (!user) {
      throw new HttpException(this.errorMessage, HttpStatus.BAD_REQUEST, {
        cause: new Error(),
      });
    } else {
      const passwordIsValid = await bcrypt.compare(
        userCredential.password,
        user.password,
      );
      if (!passwordIsValid) {
        throw new HttpException(this.errorMessage, HttpStatus.BAD_REQUEST, {
          cause: new Error(),
        });
      }
      return this.login(user);
    }
  }
  async login(user: User): Promise<TokenDto> {
    const payload = { username: user.email, sub: user.id };
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
}
