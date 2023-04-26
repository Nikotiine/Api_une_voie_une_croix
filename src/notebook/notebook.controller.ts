import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
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
    return this.notebookService.create(notebook);
  }
}
