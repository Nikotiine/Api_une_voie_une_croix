import { ApiProperty } from '@nestjs/swagger';
import { SiteDto } from './Site.dto';

export class UserContributionDto {
  @ApiProperty({
    type: [SiteDto],
  })
  sites: SiteDto[];
}
