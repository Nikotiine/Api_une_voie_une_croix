import { ApiProperty } from '@nestjs/swagger';
import { ExpositionListDto } from './ExpositionList.dto';
import { LevelListDto } from './LevelList.dto';
import { RockTypeListDto } from './RockTypeList.dto';
import { RouteProfileListDto } from './RouteProfileList.dto';
import { EquipmentListDto } from './EquipmentList.dto';
import { EngagementListDto } from './EngagementList.dto';
import { ApproachTypeListDto } from './ApproachTypeList.dto';
import { RegionListDto } from './RegionList.dto';

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
