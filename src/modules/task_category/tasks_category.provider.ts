import { Connection } from 'typeorm/connection/Connection';
import { TaskCategoryEntity } from 'src/db/entity/task_category.entity';

export const TaskCatogoryProvider = [
  {
    provide: 'TASK_CATEGORY_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(TaskCategoryEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
