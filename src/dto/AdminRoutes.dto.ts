import { RouteListDto } from './RouteList.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AdminRoutesDto extends RouteListDto {
  @ApiProperty()
  isActive: boolean;
}
