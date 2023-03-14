import { define } from 'typeorm-seeding';
import { Equipment } from '../entity/Equipment.entity';

define(Equipment, () => {
  const equipment = new Equipment();
  equipment.createdAt = new Date();
  equipment.isActive = true;
  return equipment;
});
