import { SecteurDto } from './Secteur.dto';
import { ApiProperty } from '@nestjs/swagger';
import { SiteDto } from './Site.dto';

export class SecteurSiteDto extends SecteurDto {
  @ApiProperty({
    type: SiteDto,
  })
  site: SiteDto;
}
