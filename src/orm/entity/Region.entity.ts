import { Column, Entity, OneToMany } from 'typeorm';
import { Department } from './Department.entity';
import { Site } from './Site.entity';
import { BaseEntity } from './Base.entity';

@Entity()
export class Region extends BaseEntity {
  @Column()
  name: string;
  @OneToMany(() => Department, (department) => department.region)
  departments: Department[];
  @OneToMany(() => Site, (site) => site.region)
  sites: Site[];
}
