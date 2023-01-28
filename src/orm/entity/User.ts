import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
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
}
