import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from './Level.entity';
import { Secteur } from './Secteur.entity';
import { Equipment } from './Equipment.entity';
import { Engagement } from './Engagement.entity';

@Entity()
export class Route {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  name: string;
  @Column()
  height: number;
  @Column()
  quickdraw: number;
  @ManyToOne(() => Level, (level) => level.routes)
  level: Level;
  @ManyToOne(() => Secteur, (secteur) => secteur.routes)
  secteur: Secteur;
  @ManyToOne(() => Equipment, (equipment) => equipment.routes)
  equipment: Equipment;
  @ManyToOne(() => Engagement, (engagement) => engagement.routes)
  engagement: Engagement;
  @Column()
  isActive: boolean;
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;
}
