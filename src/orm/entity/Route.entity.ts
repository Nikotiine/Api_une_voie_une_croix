import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Level } from './Level.entity';
import { Sector } from './Sector.entity';
import { Equipment } from './Equipment.entity';
import { Engagement } from './Engagement.entity';
import { Exposition } from './Exposition.entity';
import { RockType } from './RockType.entity';
import { RouteProfile } from './RouteProfile.entity';
import { User } from './User.entity';
import { BaseEntity } from './Base.entity';
import { Notebook } from './Notebook.entity';

@Entity()
@Unique(['name', 'sector'])
export class Route extends BaseEntity {
  @Column()
  name: string;
  @Column()
  height: number;
  @Column()
  quickdraw: number;
  @ManyToOne(() => Level, (level) => level.routes)
  level: Level;
  @ManyToOne(() => Sector, (Sector) => Sector.routes)
  sector: Sector;
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
  @ManyToOne(() => User, (user) => user.routes)
  author: User;
  @Column({
    type: 'text',
  })
  commentary: string;
  @OneToMany(() => Notebook, (notebook) => notebook.route)
  notebooks: Notebook[];
}
