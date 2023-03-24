import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Exposition } from './Exposition.entity';
import { RouteProfile } from './RouteProfile.entity';
import { Level } from './Level.entity';
import { Equipment } from './Equipment.entity';
import { Engagement } from './Engagement.entity';

import { RockType } from './RockType.entity';
import { Secteur } from './Secteur.entity';
import { Geometry, Point } from 'geojson';
import { Department } from './Department.entity';
import { Region } from './Region.entity';
import { ApproachType } from './ApproachType.entity';

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
  @ManyToMany(() => Exposition, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  expositions: Exposition[];
  @ManyToMany(() => RouteProfile, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  routeProfiles: RouteProfile[];
  @ManyToOne(() => Level, (level) => level.minLevels)
  minLevel: Level;
  @ManyToOne(() => Level, (level) => level.maxLevels)
  maxLevel: Level;
  @ManyToOne(() => Equipment, (equipment) => equipment.sites)
  equipment: Equipment;
  @ManyToOne(() => Engagement, (engagement) => engagement.sites)
  engagement: Engagement;
  @ManyToOne(() => ApproachType, (approachType) => approachType.sites)
  approachType: ApproachType;
  @ManyToOne(() => RockType, (rockType) => rockType.sites)
  rockType: RockType;
  @OneToMany(() => Secteur, (secteur) => secteur.site, {
    cascade: ['insert', 'update'],
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  secteurs: Secteur[];
  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'double' })
  mainParkingLat: number;
  @Column({ type: 'double' })
  mainParkingLng: number;
  @Column({
    type: 'double',
    nullable: true,
  })
  secondaryParkingLat: number;
  @Column({
    type: 'double',
    nullable: true,
  })
  secondaryParkingLng: number;
  @ManyToOne(() => Department, (department) => department.sites)
  department: Department;
  @ManyToOne(() => Region, (region) => region.sites)
  region: Region;
  @Column({ default: false })
  water: boolean;
  @Column({ default: false })
  wc: boolean;
  @Column({ default: false })
  river: boolean;
  @Column({ default: false })
  network: boolean;
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;
}
