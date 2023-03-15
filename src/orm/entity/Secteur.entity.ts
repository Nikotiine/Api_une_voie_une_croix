import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Site } from './Site.entity';
import { Route } from './Route.entity';

@Entity()
@Unique(['name', 'site'])
export class Secteur {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => Site, (site) => site.secteurs)
  site: Site;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  createdAt: Date;
  @OneToMany(() => Route, (route) => route.secteur)
  routes: Route[];
}
