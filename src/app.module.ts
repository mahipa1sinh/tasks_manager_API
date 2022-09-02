import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { TaskModule } from './modules/tasks/tasks.module';
import { TaskCategoryModule } from './modules/task_category/tasks_category.module';

@Module({
  imports: [DatabaseModule, TaskModule, TaskCategoryModule],
})
export class AppModule {}
