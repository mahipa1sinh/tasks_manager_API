import { Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { TaskCategoryService } from './tasks_category.service';
import { Request, Response } from 'express';

@Controller('task_category')
export class TaskCategoryController {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}

  @Post('create_task_category')
  async creartTaskCategory(@Req() req: Request, @Res() res: Response) {
    return await this.taskCategoryService.createTaskCategory(req, res);
  }
  @Get('fetch_category')
  async fetchTaskCategory(@Req() req: Request, @Res() res: Response) {
    return await this.taskCategoryService.fetchTaskCategory(req, res);
  }

  @Delete('delete_category/:task_category_id')
  async deleteTaskCategory(@Req() req: Request, @Res() res: Response) {
    return await this.taskCategoryService.deleteTaskCategory(req, res);
  }
}
