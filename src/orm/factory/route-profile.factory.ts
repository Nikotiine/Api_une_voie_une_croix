import { define } from 'typeorm-seeding';
import { RouteProfile } from '../entity/RouteProfile.entity';

define(RouteProfile, () => {
  const routeProfile = new RouteProfile();
  routeProfile.createdAt = new Date();
  routeProfile.isActive = true;
  return routeProfile;
});
