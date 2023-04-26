import { BeforeInsert, Column, Entity, OneToMany, Unique } from 'typeorm';
import { UserRole } from '../../enum/UserRole.enum';
import { Site } from './Site.entity';
import { Route } from './Route.entity';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from './Base.entity';
import { Notebook } from './Notebook.entity';
//import * as process from 'process';
@Entity()
@Unique(['email'])
export class User extends BaseEntity {
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
  @Column({ type: 'enum', enum: UserRole, default: UserRole.ROLE_USER })
  role: UserRole;
  @OneToMany(() => Site, (site) => site.author)
  sites: Site[];
  @OneToMany(() => Route, (route) => route.author)
  routes: Route[];
  @OneToMany(() => Notebook, (notebook) => notebook.user)
  notebooks: Notebook[];
  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
