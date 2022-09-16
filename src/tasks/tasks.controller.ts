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
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { UserRoles } from '../auth/userRole.enum';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRoles.ADMIN)
  async getTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<TaskEntity[]> {
    if (Object.keys(filterDto).length) {
      const newTasks = await this.taskService.getTasksWithFilters(filterDto);
      return newTasks;
    } else {
      const newTasks = await this.taskService.getAllTasks(user);
      return newTasks;
    }
  }

  @Post()
  async createTasks(
    @Body() createTasdDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    return await this.taskService.createTask(createTasdDto, user);
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
