import { NotebookCreateDto } from './NotebookCreate.dto';
import { ApiProperty } from '@nestjs/swagger';

export class NotebookViewDto extends NotebookCreateDto {
  @ApiProperty()
  id: number;
}
