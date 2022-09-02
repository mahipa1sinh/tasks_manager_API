import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { TaskCategoryController } from './tasks_category.controller';
import { TaskCatogoryProvider } from './tasks_category.provider';
import { TaskCategoryService } from './tasks_category.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskCategoryController],
  providers: [...TaskCatogoryProvider, TaskCategoryService],
  exports: [...TaskCatogoryProvider, TaskCategoryService],
})
export class TaskCategoryModule {}
