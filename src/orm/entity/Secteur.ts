import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Site } from './Site';

@Entity()
@Unique(['name', 'site'])
export class Secteur {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => Site, (site) => site.secteurs)
  site: Site;
}
