import { Department } from '../entity/Department.entity';
import { define } from 'typeorm-seeding';

define(Department, () => {
  return new Department();
});
