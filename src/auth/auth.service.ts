import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCredentialsDto } from '../user/dto/UserCredentials.dto';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from '../user/dto/UserRegister.dto';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { UserProfileDto } from '../user/dto/UserProfile.dto';
@Injectable()
export class AuthService {
  private salt: number;
  constructor(private userService: UserService) {
    this.salt = parseInt(process.env.BCRYPT_SALT);
  }
  public login(crendial: UserCredentialsDto) {
    const user = this.userService.findOne(crendial.email).then((data) => {
      const validCredential = bcrypt.compare(crendial.password, data.password);
      if (validCredential) {
        return data;
      }
    });

    if (!user) {
      throw new UnauthorizedException();
    }
  }

  public register(userRegister: UserRegisterDto): Promise<UserProfileDto> {
    return bcrypt.hash(userRegister.password, this.salt).then((hash) => {
      userRegister.password = hash;
      return this.userService.createUser(userRegister);
    });
  }
}
