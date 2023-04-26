import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicService } from './public.service';
import { PublicDataDto } from '../dto/PublicData.dto';

@Controller('api/public')
@ApiTags('Public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get()
  @ApiOperation({
    summary: 'Data for public home page',
  })
  @ApiCreatedResponse({
    type: PublicDataDto,
    description:
      'For the body response, Please look into the Dto PublicDataDto',
  })
  public async getDataForHomePage(): Promise<PublicDataDto> {
    return this.publicService.findDataForPublicHomePage();
  }
}
