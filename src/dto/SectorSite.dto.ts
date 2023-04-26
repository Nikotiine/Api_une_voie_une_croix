import { SectorDto } from './Sector.dto';
import { ApiProperty } from '@nestjs/swagger';
import { SiteDto } from './Site.dto';

export class SectorSiteDto extends SectorDto {
  @ApiProperty({
    type: SiteDto,
  })
  site: SiteDto;
}
