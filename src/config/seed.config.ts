import { typeOrmConfig } from './typeorm.config';

module.exports = {
  ...typeOrmConfig,
  migrationsRun: true,
  dropSchema: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  seeds: ['src/orm/seed/**/*{.ts,.js}'],
  factories: ['src/orm/factory/**/*{.ts,.js}'],
};
