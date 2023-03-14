import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Site } from './Site.entity';

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
}
