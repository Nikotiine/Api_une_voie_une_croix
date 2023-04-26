import { define } from 'typeorm-seeding';
import { Exposition } from '../entity/Exposition.entity';

define(Exposition, () => {
  return new Exposition();
});
