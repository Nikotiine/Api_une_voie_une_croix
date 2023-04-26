import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Route } from './Route.entity';
import { Site } from './Site.entity';
import { BaseEntity } from './Base.entity';

@Entity()
@Unique(['label'])
export class Level extends BaseEntity {
  @Column()
  label: string;
  @OneToMany(() => Route, (route) => route.level)
  routes: Route[];
  @OneToMany(() => Site, (site) => site.minLevel)
  minLevels: Site[];
  @OneToMany(() => Site, (site) => site.maxLevel)
  maxLevels: Site[];
}
