import { Module } from '@nestjs/common';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { DatabaseModule } from 'src/db/database.module';
import { TaskController } from './tasks.controller';
import { TaskProvider } from './tasks.provider';
import { TaskService } from './tasks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [...TaskProvider, TaskService],
  exports: [...TaskProvider, TaskService],
})
export class TaskModule {}
