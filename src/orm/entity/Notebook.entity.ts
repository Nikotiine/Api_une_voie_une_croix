import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { User } from './User.entity';
import { Route } from './Route.entity';
import { AchievementType } from '../../enum/AchievementType.enum';

@Entity()
@Unique(['user', 'route'])
export class Notebook extends BaseEntity {
  @ManyToOne(() => User, (user) => user.notebooks)
  user: User;
  @ManyToOne(() => Route, (route) => route.notebooks)
  route: Route;
  @Column()
  trials: number;
  @Column({ nullable: true })
  succeedAt: Date;
  @Column({ type: 'text' })
  commentary: string;
  @Column({ type: 'enum', enum: AchievementType })
  achievementType: AchievementType;
  @Column({ type: 'int', nullable: true })
  ranking: number;
}
