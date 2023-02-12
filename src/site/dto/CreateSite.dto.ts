import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';
import { Level } from '../../orm/entity/Level';
import { RouteProfile } from '../../orm/entity/RouteProfile';
import { Equipment } from '../../orm/entity/Equipment';
import { Engagement } from '../../orm/entity/Engagement';
import { ApproachType } from '../../orm/entity/ApproachType';
import { Exposition } from '../../orm/entity/Exposition';
import { RockType } from '../../orm/entity/RockType';
import { SecteurDto } from '../../secteur/dto/Secteur.dto';

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
  @IsString()
  mainParkingLat: string;
  @ApiProperty()
  @IsString()
  mainParkingLng: string;
  @ApiProperty()
  secondaryParkingLat: string;
  @ApiProperty()
  secondaryParkingLng: string;
  @ApiProperty()
  @IsString()
  zipCode: string;
  @ApiProperty()
  @IsString()
  regionCode: string;
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
  @ApiProperty()
  @IsBoolean()
  river: boolean;
  @ApiProperty()
  @IsBoolean()
  network: boolean;
  @ApiProperty()
  @IsBoolean()
  wc: boolean;
  @ApiProperty()
  @IsBoolean()
  water: boolean;
  @ApiProperty()
  secteurs: SecteurDto[];
}
