import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Site } from './Site.entity';
import { Route } from './Route.entity';
import { BaseEntity } from './Base.entity';

@Entity()
@Unique(['label'])
export class RockType extends BaseEntity {
  @Column()
  label: string;
  @OneToMany(() => Site, (site) => site.rockType)
  sites: Site[];
  @OneToMany(() => Route, (route) => route.rockType)
  routes: Route[];
}
