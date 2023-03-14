import { define } from 'typeorm-seeding';
import { Exposition } from '../entity/Exposition.entity';

define(Exposition, () => {
  const exposition = new Exposition();
  exposition.createdAt = new Date();
  exposition.isActive = true;
  return exposition;
});
