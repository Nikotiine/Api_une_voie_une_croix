import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../orm/entity/User';
import * as process from 'process';
export const TypeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: '',
  database: process.env.DATABASE_NAME,
  entities: [User],
  synchronize: true,
};
