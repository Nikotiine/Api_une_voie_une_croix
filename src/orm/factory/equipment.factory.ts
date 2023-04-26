import { define } from 'typeorm-seeding';
import { Equipment } from '../entity/Equipment.entity';

define(Equipment, () => {
  return new Equipment();
});
