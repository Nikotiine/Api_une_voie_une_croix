import { define } from 'typeorm-seeding';
import { Level } from '../entity/Level.entity';

define(Level, () => {
  const level = new Level();
  level.createdAt = new Date();
  level.isActive = true;
  return level;
});
