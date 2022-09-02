import { TaskEntity } from '../../db/entity/task.entity';
import { Connection } from 'typeorm/connection/Connection';

export const TaskProvider = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(TaskEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
