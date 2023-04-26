import { define } from 'typeorm-seeding';
import { RockType } from '../entity/RockType.entity';

define(RockType, () => {
  return new RockType();
});
