import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LevelService } from './level.service';
import { LevelsDto } from './dto/Levels.dto';

@Controller('api/level')
@ApiTags('Level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}
  @Get()
  @ApiCreatedResponse({
    type: [LevelsDto],
    description: 'List of levels',
  })
  public async getAllLevels(): Promise<LevelsDto[]> {
    return this.levelService.findAll();
  }
}
