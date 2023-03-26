import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserRole } from '../../enum/UserRole.enum';
import { Site } from './Site.entity';
import { Route } from './Route.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  birthday: Date;
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;
  @Column({ default: true })
  isActive: boolean;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.ROLE_USER })
  role: UserRole;
  @OneToMany(() => Site, (site) => site.author)
  sites: Site[];
  @OneToMany(() => Route, (route) => route.author)
  routes: Route[];
}
