import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ObjectID } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

import { GetTaskFilterDto } from './dto/get-taskFilter.dto';
import { TaskEntity } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
// import { Task } from './task.model';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getTasks(@Query() filterDto: GetTaskFilterDto): Promise<TaskEntity[]> {
    if (Object.keys(filterDto).length) {
      const newTasks = await this.taskService.getTasksWithFilters(filterDto);
      return newTasks;
    } else {
      console.log('helloo');

      const newTasks = await this.taskService.getAllTasks();
      return newTasks;
    }
  }

  @Post()
  async createTasks(@Body() createTasdDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.taskService.createTask(createTasdDto);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: ObjectID): Promise<TaskEntity> {
    return await this.taskService.getTaskById(id);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: ObjectID): Promise<void> {
    return await this.taskService.deleteTask(id);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: ObjectID,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    const { status } = updateTaskStatusDto;

    return await this.taskService.updateTaskById(id, status);
  }
}
