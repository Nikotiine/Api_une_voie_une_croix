import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from './Region';

@Entity()
export class Department {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Region, (region) => region.departments)
  region: Region;
  @Column()
  name: string;
  @Column()
  lat: string;
  @Column()
  lng: string;
}
