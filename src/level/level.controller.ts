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
    return this.levelService.findAll().then((levels) => {
      const levelList: LevelsDto[] = [];
      for (let i = 0; i < levels.length; i++) {
        const level: LevelsDto = {
          id: levels[i].id,
          label: levels[i].label,
        };
        levelList.push(level);
      }
      return levelList;
    });
  }
}
