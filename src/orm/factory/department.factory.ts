import { Department } from '../entity/Department.entity';
import { define } from 'typeorm-seeding';

define(Department, () => {
  const department = new Department();
  department.createdAt = new Date();
  department.isActive = true;
  return department;
});
