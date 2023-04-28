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

  @Get(':id')
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
}
