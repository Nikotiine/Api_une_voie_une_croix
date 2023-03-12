import { ApiProperty } from '@nestjs/swagger';
import { ExpositionListDto } from '../../general-informations/dto/ExpositionList.dto';
import { LevelListDto } from '../../general-informations/dto/LevelList.dto';
import { RockTypeListDto } from '../../general-informations/dto/RockTypeList.dto';
import { RouteProfileListDto } from '../../general-informations/dto/RouteProfileList.dto';
import { EquipmentListDto } from '../../general-informations/dto/EquipmentList.dto';
import { EngagementListDto } from '../../general-informations/dto/EngagementList.dto';
import { ApproachTypeListDto } from '../../general-informations/dto/ApproachTypeList.dto';
import { RegionListDto } from '../../location/dto/RegionList.dto';

export class SiteDataDto {
  @ApiProperty({ type: [ExpositionListDto] })
  expositions: ExpositionListDto[];
  @ApiProperty({ type: [LevelListDto] })
  levels: LevelListDto[];
  @ApiProperty({ type: [RockTypeListDto] })
  rockTypes: RockTypeListDto[];
  @ApiProperty({ type: [RouteProfileListDto] })
  routeProfiles: RouteProfileListDto[];
  @ApiProperty({ type: [EquipmentListDto] })
  equipments: EquipmentListDto[];
  @ApiProperty({ type: [EngagementListDto] })
  engagements: EngagementListDto[];
  @ApiProperty({ type: [ApproachTypeListDto] })
  approachTypes: ApproachTypeListDto[];
  @ApiProperty({ type: [RegionListDto] })
  regions: RegionListDto[];
}
