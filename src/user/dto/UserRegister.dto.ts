import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @ApiProperty({
    example: 'John',
  })
  @IsString()
  firstName: string;
  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsDateString()
  birthday: Date;

  @ApiProperty({
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '*******',
  })
  @IsString()
  password: string;
}
