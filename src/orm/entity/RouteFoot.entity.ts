import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { Site } from './Site.entity';

@Entity()
export class RouteFoot extends BaseEntity {
  @Column()
  label: string;
  @OneToMany(() => Site, (site) => site.routeFoot)
  sites: Site[];
}
