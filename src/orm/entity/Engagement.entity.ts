import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Route } from './Route.entity';
import { Site } from './Site.entity';
import { BaseEntity } from './Base.entity';

@Entity()
@Unique(['label'])
export class Engagement extends BaseEntity {
  @Column()
  label: string;
  @OneToMany(() => Route, (route) => route.engagement)
  routes: Route[];
  @OneToMany(() => Site, (site) => site.engagement)
  sites: Site[];
}
