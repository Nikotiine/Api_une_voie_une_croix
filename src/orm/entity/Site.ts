import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  Index,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Exposition } from './Exposition';
import { RouteProfile } from './RouteProfile';
import { Level } from './Level';
import { Equipment } from './Equipment';
import { Engagement } from './Engagement';
import { ApproachType } from './ApproachType';
import { RockType } from './RockType';
import { Secteur } from './Secteur';
import { Geometry, Point } from 'geojson';

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
  rockType: RockType;
  @OneToMany(() => Secteur, (secteur) => secteur.site, {
    cascade: true,
  })
  @JoinColumn()
  secteurs: Secteur[];
  @Column({ default: true })
  isActive: boolean;

  @Column('point')
  mainParking: string;
  @Column({
    type: 'point',
    nullable: true,
  })
  secondaryParking: string;
  @Column()
  zipCode: string;
  @Column()
  regionCode: string;
  @Column({ default: false })
  water: boolean;
  @Column({ default: false })
  wc: boolean;
  @Column({ default: false })
  river: boolean;
  @Column({ default: false })
  network: boolean;
}
