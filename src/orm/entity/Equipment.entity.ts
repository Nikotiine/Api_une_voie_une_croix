import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Route } from './Route.entity';
import { Site } from './Site.entity';
import { BaseEntity } from './Base.entity';

@Entity()
@Unique(['label'])
export class Equipment extends BaseEntity {
  @Column()
  label: string;
  @OneToMany(() => Route, (route) => route.equipment)
  routes: Route[];
  @OneToMany(() => Site, (site) => site.equipment)
  sites: Site[];
}
