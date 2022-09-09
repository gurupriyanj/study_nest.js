import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-taskFilter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      const newTasks = await this.taskService.getTasksWithFilters(filterDto);
      return newTasks;
    } else {
      const newTasks = await this.taskService.getAllTasks();
      return newTasks;
    }
  }

  @Post()
  async createTasks(@Body() createTasdDto: CreateTaskDto): Promise<Task> {
    const newTask = await this.taskService.createTask(createTasdDto);
    return newTask;
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return await this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return await this.taskService.updateTaskById(id, status);
  }
}
