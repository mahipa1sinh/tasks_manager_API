import { Request, Response } from 'express';
import { Inject, Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/db/entity/task.entity';
import { Repository } from 'typeorm/repository/Repository';
import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { TaskCategoryEntity } from 'src/db/entity/task_category.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskEntity: Repository<TaskEntity>,
  ) {}

  async createTask(req: Request, res: Response) {
    const {
      task_title,
      task_description,
      task_scheduled_at,
      task_category_ids,
    } = req.body;

    const taskCategoryEntity = getRepository(TaskCategoryEntity);
    const categoryData = await taskCategoryEntity.findByIds(task_category_ids);

    const taskEntity = new TaskEntity();

    taskEntity.task_title = task_title;
    taskEntity.task_description = task_description;
    taskEntity.task_scheduled_at = task_scheduled_at;
    taskEntity.task_categories = categoryData;

    taskEntity
      .save()
      .then((data: TaskEntity) => {
        return res.send({
          status: true,
          data: data,
        });
      })
      .catch((error: Error) => {
        return res.send({
          status: false,
          data: error,
        });
      });
  }

  async fetchTasks(req: Request, res: Response) {
    try {
      const data = await this.taskEntity
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.task_categories', 'task_categories')
        .getMany();
      if (data !== undefined) {
        return res.send({
          status: true,
          data,
        });
      }
    } catch (error) {
      return res.send({
        status: false,
        data: error,
      });
    }
  }

  async fetchArchivedTask(req: Request, res: Response) {
    try {
      const data = await this.taskEntity
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.task_categories', 'task_categories')
        .where('task.is_task_archived = true')
        .getMany();
      if (data !== undefined) {
        return res.send({
          status: true,
          data,
        });
      }
    } catch (error) {
      return res.send({
        status: false,
        data: error,
      });
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { task_id } = req.params;
    try {
      this.taskEntity
        .createQueryBuilder('task')
        .delete()
        .from(TaskEntity)
        .where('task.task_id = :task_id', { task_id })
        .execute()
        .then((data: DeleteResult) => {
          return res.send({
            status: true,
            data,
          });
        })
        .catch((error: Error) => {
          return res.send({
            status: false,
            data: error.message,
          });
        });
    } catch (error) {
      return res.send({
        status: false,
        data: error,
      });
    }
  }
  async updateTask(req: Request, res: Response) {
    const { task_id, task_title, task_description, task_scheduled_at } =
      req.body;
    try {
      const oldTaskData = await this.taskEntity
        .createQueryBuilder('task')
        .where('task.task_id = :task_id', { task_id })
        .getOne();

      const newTaskTitle =
        task_title == undefined || task_title == ''
          ? oldTaskData.task_title
          : task_title;

      const newTaskDescription =
        task_description == undefined || task_description == ''
          ? oldTaskData.task_description
          : task_description;

      const newTaskScheduledAt =
        task_scheduled_at == undefined || task_scheduled_at == ''
          ? oldTaskData.task_scheduled_at
          : task_scheduled_at;

      this.taskEntity
        .createQueryBuilder('task')
        .update()
        .set({
          task_title: newTaskTitle,
          task_description: newTaskDescription,
          task_scheduled_at: newTaskScheduledAt,
        })
        .where('task.task_id = :task_id', { task_id })
        .execute()
        .then((data: UpdateResult) => {
          return res.send({
            status: true,
            data,
          });
        })
        .catch((error: Error) => {
          return res.send({
            status: false,
            data: error.message,
          });
        });
    } catch (error) {
      return res.send({
        status: false,
        data: error,
      });
    }
  }
  async setArchiveTask(req: Request, res: Response) {
    const { task_id, is_task_archived } = req.body;
    try {
      this.taskEntity
        .createQueryBuilder('task')
        .update()
        .set({
          is_task_archived,
        })
        .where('task.task_id = :task_id', { task_id })
        .execute()
        .then((data: UpdateResult) => {
          return res.send({
            status: true,
            data,
          });
        })
        .catch((error: Error) => {
          return res.send({
            status: false,
            data: error.message,
          });
        });
    } catch (error) {
      return res.send({
        status: false,
        data: error,
      });
    }
  }
  async setStatus(req: Request, res: Response) {
    const { task_id, task_status } = req.body;
    try {
      this.taskEntity
        .createQueryBuilder('task')
        .update()
        .set({
          task_status,
        })
        .where('task.task_id = :task_id', { task_id })
        .execute()
        .then((data: UpdateResult) => {
          return res.send({
            status: true,
            data,
          });
        })
        .catch((error: Error) => {
          return res.send({
            status: false,
            data: error.message,
          });
        });
    } catch (error) {
      return res.send({
        status: false,
        data: error,
      });
    }
  }
}
