import { define } from 'typeorm-seeding';
import { Level } from '../entity/Level.entity';

define(Level, () => {
  return new Level();
});
