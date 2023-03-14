import { define } from 'typeorm-seeding';
import { Region } from '../entity/Region.entity';

define(Region, () => {
  const region = new Region();
  region.createdAt = new Date();
  region.isActive = true;
  return region;
});
