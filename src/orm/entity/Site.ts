import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  Index,
} from 'typeorm';
import { Exposition } from './Exposition';
import { RouteProfile } from './RouteProfile';
import { Level } from './Level';
import { Equipment } from './Equipment';
import { Engagement } from './Engagement';
import { ApproachType } from './ApproachType';
import { RockType } from './RockType';
import { Secteur } from './Secteur';

@Entity()
@Unique(['name'])
export class Site {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  name: string;
  @Column()
  approachTime: number;
  @Column()
  averageRouteHeight: number;
  @Column()
  averageRouteNumber: number;
  @ManyToMany(() => Exposition)
  @JoinTable()
  expositions: Exposition[];
  @ManyToMany(() => RouteProfile)
  @JoinTable()
  routeProfiles: RouteProfile[];
  @ManyToOne(() => Level, (level) => level.label)
  minLevel: Level;
  @ManyToOne(() => Level, (level) => level.label)
  maxLevel: Level;
  @ManyToOne(() => Equipment, (equipment) => equipment.label)
  equipment: Equipment;
  @ManyToOne(() => Engagement, (engagement) => engagement.label)
  engagement: Engagement;
  @ManyToOne(() => ApproachType, (approachType) => approachType.label)
  approachType: ApproachType;
  @ManyToOne(() => RockType, (rockType) => rockType.label)
  rockType: RockType[];
  @ManyToMany(() => Secteur)
  @JoinTable()
  secteurs: Secteur[];
  @Column({ default: true })
  isActive: boolean;

  @Column('point')
  mainParking: string;
  @Column('point')
  secondaryParking: string;
}
