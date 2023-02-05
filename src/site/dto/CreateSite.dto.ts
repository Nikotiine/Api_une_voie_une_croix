import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import { Geometry, Point } from 'geojson';
import { PointDto } from './Point.dto';

export class CreateSiteDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  approachTime: number;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  averageRouteHeight: number;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  averageRouteNumber: number;
  // @ApiProperty()
  @ApiProperty()
  latitudeP1: string;
  @ApiProperty()
  longitudeP1: string;
}
