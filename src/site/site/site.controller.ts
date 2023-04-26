import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { SiteCreateDto } from '../../dto/SiteCreate.dto';
import { SiteService } from './site.service';
import { SiteListDto } from '../../dto/SiteList.dto';
import { SiteViewDto } from '../../dto/SiteView.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { ApiMessage } from '../../enum/ApiMessage.enum';

@Controller('api/site')
@ApiTags('Site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  //**************************************************** POST OPERATIONS ***********************************************
  /**
   * Creation d'un nouveau site
   * @param req JWT
   * @param siteCreateDto description dans dto => SiteCreateDto
   */
  @Post()
  @ApiOperation({
    summary: 'Create site resource',
    description: 'Entry point for post new site ',
  })
  @ApiBody({
    type: SiteCreateDto,
    description: ApiMessage.BODY_DESCRIPTION + 'SiteCreateDto',
  })
  @ApiCreatedResponse({
    type: SiteListDto,
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'SiteListDto',
  })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  public async createSite(
    @Request() req,
    @Body() siteCreateDto: SiteCreateDto,
  ): Promise<SiteListDto> {
    return this.siteService.create(siteCreateDto);
  }

  // **************************************************** GET OPERATIONS ***********************************************
  /**
   * Recupere la liste complete des sites / acces public
   */
  @Get()
  @ApiOperation({
    summary: 'Get all sites',
    description: 'Return all actives site',
  })
  @ApiCreatedResponse({
    type: [SiteListDto],
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'SiteListDto',
  })
  public async getAllSites(): Promise<SiteListDto[]> {
    return this.siteService.findAllActive();
  }

  /**
   * Recupere le detail d'un site / acces public
   * @param id du site
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get one site resource',
    description: 'Entry point for get a site resource',
  })
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of site resource',
  })
  @ApiCreatedResponse({
    type: SiteViewDto,
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'SiteViewDto',
  })
  public async getSite(@Param('id') id: number): Promise<SiteViewDto> {
    return this.siteService.findOneById(id);
  }

  // ********** PUT OPERATION *************
  /**
   * Edition d'un site / JWT required
   * @param req Json web token
   * @param id du site
   * @param site escription dans dto => SiteCreateDto
   */
  @Put(':id')
  @ApiParam({
    name: 'id',
    allowEmptyValue: false,
    description: 'id of site resource',
  })
  @ApiBody({
    type: SiteCreateDto,
    description: ApiMessage.BODY_DESCRIPTION + 'SiteCreateDto',
  })
  @ApiCreatedResponse({
    type: SiteViewDto,
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'SiteViewDto',
  })
  @ApiOperation({
    summary: 'Edit site',
    description: 'Entry point for edit one site ',
  })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  public async editSite(
    @Request() req,
    @Param('id') id: number,
    @Body() site: SiteCreateDto,
  ): Promise<SiteViewDto> {
    return this.siteService.update(id, site);
  }
  // ********** DELETE OPERATION *************
}
