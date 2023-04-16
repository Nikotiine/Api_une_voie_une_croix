import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Level } from './Level.entity';
import { Secteur } from './Secteur.entity';
import { Equipment } from './Equipment.entity';
import { Engagement } from './Engagement.entity';
import { Exposition } from './Exposition.entity';
import { RockType } from './RockType.entity';
import { RouteProfile } from './RouteProfile.entity';
import { User } from './User.entity';

@Entity()
@Unique(['name', 'secteur'])
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
  @ManyToOne(() => Exposition, (exposition) => exposition.routes)
  exposition: Exposition;
  @ManyToOne(() => RockType, (rockType) => rockType.routes)
  rockType: RockType;
  @ManyToOne(() => RouteProfile, (routeProfile) => routeProfile.routes)
  routeProfile: RouteProfile;
  @Column()
  isActive: boolean;
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;
  @ManyToOne(() => User, (user) => user.routes)
  author: User;
}
