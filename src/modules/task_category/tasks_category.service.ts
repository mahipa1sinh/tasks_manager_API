import { Request, Response } from 'express';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { DeleteResult, getRepository } from 'typeorm';
import { TaskCategoryEntity } from 'src/db/entity/task_category.entity';

@Injectable()
export class TaskCategoryService {
  constructor(
    @Inject('TASK_CATEGORY_REPOSITORY')
    private taskCategoryEntity: Repository<TaskCategoryEntity>,
  ) {}

  async createTaskCategory(req: Request, res: Response) {
    const { task_category_title, task_category_description } = req.body;

    const taskCategoryEntity = new TaskCategoryEntity();

    taskCategoryEntity.task_category_title = task_category_title;
    taskCategoryEntity.task_category_description = task_category_description;

    taskCategoryEntity
      .save()
      .then((data: TaskCategoryEntity) => {
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

  async fetchTaskCategory(req: Request, res: Response) {
    try {
      const data = await this.taskCategoryEntity
        .createQueryBuilder('task_category')
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

  async deleteTaskCategory(req: Request, res: Response) {
    const { task_category_id } = req.params;
    try {
      this.taskCategoryEntity
        .createQueryBuilder('task_category')
        .delete()
        .from(TaskCategoryEntity)
        .where('task_category.task_category_id = :task_category_id', {
          task_category_id,
        })
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
}
