import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LevelService } from './level.service';

@Controller('api/level')
@ApiTags('Level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}
}
