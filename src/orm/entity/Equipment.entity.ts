import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Route } from './Route.entity';
import { Site } from './Site.entity';

@Entity()
@Unique(['label'])
export class Equipment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  label: string;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  createdAt: Date;
  @OneToMany(() => Route, (route) => route.equipment)
  routes: Route[];
  @OneToMany(() => Site, (site) => site.equipment)
  sites: Site[];
}
