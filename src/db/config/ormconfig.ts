import { join, resolve } from 'path';

const options = {
  type: 'postgres',
  host: 'localhost',
  synchronize: true,
  dropScheme: false,
  port: 5432,
  username: 'postgres',
  password: 'mahi2002',
  database: 'task_planner',
  entities: [resolve(__dirname, '..', 'entity', '*')],
  migrations: [resolve(__dirname, '..', 'migrations', '*')],
  cli: {
    entitiesDir: join('src', 'db', 'entity'),
    migrationDir: join('src', 'db', 'migrations'),
  },
};
module.exports = options;
