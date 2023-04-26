import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDto } from './UserProfile.dto';
import { RouteDto } from './Route.dto';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class NotebookCreateDto {
  @ApiProperty({
    type: UserProfileDto,
  })
  user: UserProfileDto;
  @ApiProperty({
    type: RouteDto,
  })
  route: RouteDto;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  trials: number;
  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  succeedAt: Date;
  @ApiProperty()
  @IsString()
  commentary: string;
}
