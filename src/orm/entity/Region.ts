import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from './Department';

@Entity()
export class Region {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;
  @OneToMany(() => Department, (department) => department.region)
  departments: Department[];
}
