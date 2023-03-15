import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Region } from './Region.entity';
import { Site } from './Site.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Region, (region) => region.departments)
  region: Region;
  @Column()
  name: string;
  @Column({
    type: 'double',
  })
  lat: number;
  @Column({
    type: 'double',
  })
  lng: number;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  createdAt: Date;
  @OneToMany(() => Site, (site) => site.department)
  sites: Site[];
}
