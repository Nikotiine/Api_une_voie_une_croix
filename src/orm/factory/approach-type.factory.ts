import { define } from 'typeorm-seeding';
import { ApproachType } from '../entity/ApproachType.entity';

define(ApproachType, () => {
  return new ApproachType();
});
