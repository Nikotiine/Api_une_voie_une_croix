import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { NotebookService } from './notebook.service';
import { NotebookCreateDto } from '../dto/NotebookCreate.dto';
import { NotebookViewDto } from '../dto/NotebookView.dto';
import { ApiMessage } from '../enum/ApiMessage.enum';
import { RatingRouteDto } from '../dto/RatingRoute.dto';

@Controller('api/notebook')
@ApiTags('Notebook')
export class NotebookController {
  constructor(private readonly notebookService: NotebookService) {}

  @Post()
  @ApiOperation({
    summary: 'Post new notebook',
    description: 'Entry point for post new user notebook',
  })
  @ApiBody({
    type: NotebookCreateDto,
    description: ApiMessage.BODY_DESCRIPTION + 'NotebookCreateDto',
  })
  @ApiCreatedResponse({
    type: NotebookViewDto,
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'NotebookViewDto',
  })
  public async createNewNotebook(
    @Body() notebook: NotebookCreateDto,
  ): Promise<NotebookViewDto> {
    console.log(notebook);
    return this.notebookService.create(notebook);
  }

  @Get('user/:id')
  @ApiOperation({
    summary: 'Get notebooks',
    description: 'Return all active notebook filtered by user.id',
  })
  @ApiCreatedResponse({
    type: [NotebookViewDto],
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'NotebookViewDto',
  })
  @ApiParam({
    name: 'id',
    description: 'id of user',
  })
  public async getNotebooks(
    @Param('id') userId: number,
  ): Promise<NotebookViewDto[]> {
    return this.notebookService.findAllActiveByUser(userId);
  }
  @Get('view/:id')
  @ApiOperation({
    summary: 'Get notebooks',
    description: 'Return  notebook filtered by .id',
  })
  @ApiCreatedResponse({
    type: NotebookViewDto,
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'NotebookViewDto',
  })
  @ApiParam({
    name: 'id',
    description: 'id of user',
  })
  public async getNotebook(@Param('id') id: number): Promise<NotebookViewDto> {
    return this.notebookService.findById(id);
  }

  @Get('rating/all')
  @ApiOperation({
    summary: 'Get rating all route',
    description: 'Return  all rating of notebook ',
  })
  @ApiCreatedResponse({
    type: [RatingRouteDto],
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'RatingRouteDto',
  })
  public async getAllRatingsRoutes(): Promise<RatingRouteDto[]> {
    return this.notebookService.getAllRatingRoute();
  }
  @Get('rating/site/:id')
  @ApiOperation({
    summary: 'Get rating all route',
    description: 'Return  all rating of notebook ',
  })
  @ApiParam({
    name: 'id',
    description: 'id of the site',
  })
  @ApiCreatedResponse({
    type: [RatingRouteDto],
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'RatingRouteDto',
  })
  public async getAllRatingsRoutesBySite(
    @Param('id') id: number,
  ): Promise<RatingRouteDto[]> {
    return this.notebookService.getAllRatingRouteBySite(id);
  }
  @Get('rating/route/:id')
  @ApiOperation({
    summary: 'Get rating by route',
    description: 'Return  all rating of notebook ',
  })
  @ApiParam({
    name: 'id',
    description: 'id of the route',
  })
  @ApiCreatedResponse({
    type: [RatingRouteDto],
    description: ApiMessage.CREATED_RESPONSE_DESCRIPTION + 'RatingRouteDto',
  })
  public async getAllRatingsByRoute(
    @Param('id') id: number,
  ): Promise<RatingRouteDto[]> {
    return this.notebookService.getAllRatingRouteByRoute(id);
  }
}
