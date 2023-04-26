import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Route } from './Route.entity';
import { BaseEntity } from './Base.entity';

@Entity()
@Unique(['label'])
export class RouteProfile extends BaseEntity {
  @Column()
  label: string;
  @OneToMany(() => Route, (route) => route.routeProfile)
  routes: Route[];
}
