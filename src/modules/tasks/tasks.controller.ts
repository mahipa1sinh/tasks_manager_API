import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Request, Response } from 'express';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create_task')
  async creartTask(@Req() req: Request, @Res() res: Response) {
    return await this.taskService.createTask(req, res);
  }
  @Get('fetch')
  async fetchTasks(@Req() req: Request, @Res() res: Response) {
    return await this.taskService.fetchTasks(req, res);
  }
  @Get('fetch_archive')
  async fetchArchivedTask(@Req() req: Request, @Res() res: Response) {
    return await this.taskService.fetchArchivedTask(req, res);
  }

  @Delete('delete/:task_id')
  async deleteTask(@Req() req: Request, @Res() res: Response) {
    return await this.taskService.deleteTask(req, res);
  }
  @Put('update')
  async updateTask(@Req() req: Request, @Res() res: Response) {
    return await this.taskService.updateTask(req, res);
  }
  @Put('set_archive')
  async setArchiveTask(@Req() req: Request, @Res() res: Response) {
    return await this.taskService.setArchiveTask(req, res);
  }
  @Put('set_status')
  async setStatus(@Req() req: Request, @Res() res: Response) {
    return await this.taskService.setStatus(req, res);
  }
}
