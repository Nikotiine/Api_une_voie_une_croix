import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  fistName: string;
  @ApiProperty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsDateString()
  birthday: Date;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}
