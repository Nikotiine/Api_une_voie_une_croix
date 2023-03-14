import { define } from 'typeorm-seeding';
import { RockType } from '../entity/RockType.entity';

define(RockType, () => {
  const rockType = new RockType();
  rockType.createdAt = new Date();
  rockType.isActive = true;
  return rockType;
});
