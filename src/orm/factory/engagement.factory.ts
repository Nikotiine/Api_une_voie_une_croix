import { define } from 'typeorm-seeding';
import { Engagement } from '../entity/Engagement.entity';

define(Engagement, () => {
  const engagement = new Engagement();
  engagement.createdAt = new Date();
  engagement.isActive = true;
  return engagement;
});
