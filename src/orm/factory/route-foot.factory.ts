import { define } from 'typeorm-seeding';
import { RouteFoot } from '../entity/RouteFoot.entity';

define(RouteFoot, () => {
  return new RouteFoot();
});
