import { Connection, createConnection } from 'typeorm';

export const connection = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<Connection> =>
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      await createConnection(require('./config/ormconfig')),
  },
];
