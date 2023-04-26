import { define } from 'typeorm-seeding';
import { RouteProfile } from '../entity/RouteProfile.entity';

define(RouteProfile, () => {
  return new RouteProfile();
});
