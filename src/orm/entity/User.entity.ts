import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../../enum/UserRole.enum';
import { Site } from './Site.entity';
import { Route } from './Route.entity';
import * as bcrypt from 'bcrypt';
//import * as process from 'process';
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
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ default: true })
  isActive: boolean;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.ROLE_USER })
  role: UserRole;
  @OneToMany(() => Site, (site) => site.author)
  sites: Site[];
  @OneToMany(() => Route, (route) => route.author)
  routes: Route[];
  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
