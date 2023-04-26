import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Site } from './Site.entity';
import { Route } from './Route.entity';
import { BaseEntity } from './Base.entity';

@Entity()
@Unique(['name', 'site'])
export class Sector extends BaseEntity {
  @Column()
  name: string;
  @ManyToOne(() => Site, (site) => site.sectors)
  site: Site;
  @OneToMany(() => Route, (route) => route.sector)
  routes: Route[];
}
