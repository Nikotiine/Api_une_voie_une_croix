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
export class Level {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  label: string;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  createdAt: Date;
  @OneToMany(() => Route, (route) => route.level)
  routes: Route[];
  @OneToMany(() => Site, (site) => site.minLevel)
  minLevels: Site[];
  @OneToMany(() => Site, (site) => site.maxLevel)
  maxLevels: Site[];
}
