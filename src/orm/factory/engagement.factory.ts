import { define } from 'typeorm-seeding';
import { Engagement } from '../entity/Engagement.entity';

define(Engagement, () => {
  return new Engagement();
});
