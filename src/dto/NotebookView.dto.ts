import { NotebookCreateDto } from './NotebookCreate.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RouteViewDto } from './RouteView.dto';

export class NotebookViewDto extends NotebookCreateDto {
  @ApiProperty()
  id: number;
  @ApiProperty({
    type: RouteViewDto,
  })
  route: RouteViewDto;
}
