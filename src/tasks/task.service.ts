import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';

import { ObjectID, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-taskFilter.dto';
import { TaskEntity, taskStatus } from './task.entity';
import { of } from 'rxjs';
import { join } from 'path';
import { unlinkSync } from 'fs';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async getAllTasks(user: User): Promise<TaskEntity[]> {
    console.log('user', user);
    const allTasks = await this.taskRepository.find();
    return allTasks;
  }
  async getTasksWithFilters(
    filterDto: GetTaskFilterDto,
  ): Promise<TaskEntity[]> {
    const { status } = filterDto;
    if (status) {
      const filteredTasks = await this.taskRepository.find({
        where: { status },
      });
      return filteredTasks;
    }
  }

  async createTask(
    createTasdDto: CreateTaskDto,
    user: User,
  ): Promise<TaskEntity> {
    const { title, description } = createTasdDto;
    const newTask = this.taskRepository.create({
      title,
      description,
      status: taskStatus.OPEN,
      user,
    });
    await newTask.save();
    return newTask;
  }

  async getTaskById(id: ObjectID): Promise<TaskEntity> {
    console.log('id', id);
    const task = await this.taskRepository.findOneById(id);
    console.log('data', task);
    return task;
  }
  async deleteTask(id: ObjectID): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async updateTaskById(id: ObjectID, status: taskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
  async findFile(filename: string, res: any): Promise<any> {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + filename)));
  }
  async deleteFile(filename: string): Promise<any> {
    try {
      unlinkSync(`./uploads/${filename}`);
      return {
        message: `${filename} is deleted successfullly`,
        filename: filename,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
