import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Site } from './Site.entity';

@Entity()
@Unique(['label'])
export class RockType {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  label: string;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  createdAt: Date;
  @OneToMany(() => Site, (site) => site.rockType)
  sites: Site[];
}
