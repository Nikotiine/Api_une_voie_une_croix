import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config/jwt.config';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserModule, PassportModule, JwtModule.registerAsync(jwtConfig)],
})
export class AuthModule {}
