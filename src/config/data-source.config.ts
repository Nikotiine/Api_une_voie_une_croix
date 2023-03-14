import { DataSource } from 'typeorm';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/orm/migrations/*.js'],
  migrationsRun: true,
});
