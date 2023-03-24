import { DataRouteDto } from './DataRoute.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ApproachTypeDto } from './ApproachType.dto';
import { RegionDto } from './Region.dto';
import { RockTypeDto } from './RockType.dto';

export class DataSiteDto extends DataRouteDto {
  @ApiProperty({ type: [ApproachTypeDto] })
  approachTypes: ApproachTypeDto[];
  @ApiProperty({ type: [RegionDto] })
  regions: RegionDto[];
  @ApiProperty({ type: [RockTypeDto] })
  rockTypes: RockTypeDto[];
}
