import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Site } from './Site.entity';
import { BaseEntity } from './Base.entity';

@Entity()
@Unique(['label'])
export class ApproachType extends BaseEntity {
  @Column()
  label: string;
  @OneToMany(() => Site, (site) => site.approachType)
  sites: Site[];
}
