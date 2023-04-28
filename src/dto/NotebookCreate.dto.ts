import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDto } from './UserProfile.dto';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { AchievementType } from '../enum/AchievementType.enum';
import { RouteDto } from './Route.dto';

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
  @ApiProperty({
    enum: AchievementType,
  })
  achievementType: AchievementType;
}
