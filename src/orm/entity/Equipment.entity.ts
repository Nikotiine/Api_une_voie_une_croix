import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['label'])
export class Equipment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  label: string;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  createdAt: Date;
}
