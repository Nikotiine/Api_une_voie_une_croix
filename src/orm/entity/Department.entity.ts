import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Region } from './Region.entity';
import { Site } from './Site.entity';
import { BaseEntity } from './Base.entity';

@Entity()
export class Department extends BaseEntity {
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
  @OneToMany(() => Site, (site) => site.department)
  sites: Site[];
}
