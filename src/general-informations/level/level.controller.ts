import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/level')
@ApiTags('Level')
export class LevelController {}
