import { define } from 'typeorm-seeding';
import { ApproachType } from '../entity/ApproachType.entity';

define(ApproachType, () => {
  const approachType = new ApproachType();
  approachType.createdAt = new Date();
  approachType.isActive = true;
  return approachType;
});
