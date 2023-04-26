import { define } from 'typeorm-seeding';
import { Region } from '../entity/Region.entity';

define(Region, () => {
  return new Region();
});
