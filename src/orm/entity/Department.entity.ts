import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from './Region.entity';

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
}
