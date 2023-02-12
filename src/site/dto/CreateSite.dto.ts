import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import { Level } from '../../orm/entity/Level';
import { RouteProfile } from '../../orm/entity/RouteProfile';
import { Equipment } from '../../orm/entity/Equipment';
import { Engagement } from '../../orm/entity/Engagement';
import { ApproachType } from '../../orm/entity/ApproachType';
import { Exposition } from '../../orm/entity/Exposition';
import { RockType } from '../../orm/entity/RockType';

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

  @ApiProperty()
  mainParkingLat: string;
  @ApiProperty()
  mainParkingLng: string;
  @ApiProperty()
  secondaryParkingLat: string;
  @ApiProperty()
  secondaryParkingLng: string;
  @ApiProperty()
  minLevel: Level;
  @ApiProperty()
  maxLevel: Level;

  @ApiProperty()
  equipment: Equipment;
  @ApiProperty()
  engagement: Engagement;
  @ApiProperty()
  approachType: ApproachType;
  @ApiProperty()
  expositions: Exposition[];
  @ApiProperty()
  routeProfiles: RouteProfile[];
  @ApiProperty()
  rockType: RockType;
}
