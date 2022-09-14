import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ObjectID, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-taskFilter.dto';
import { TaskEntity, taskStatus } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async getAllTasks(): Promise<TaskEntity[]> {
    console.log('how are you');

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

  async createTask(createTasdDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTasdDto;
    const newTask = this.taskRepository.create({
      title,
      description,
      status: taskStatus.OPEN,
    });
    await newTask.save();
    return newTask;
  }

  async getTaskById(id: ObjectID): Promise<TaskEntity> {
    console.log('id', id);
    const task = await this.taskRepository.findOneById(id);
    // const task = await this.taskRepository.findOneBy({ id });
    console.log('data', task);
    return task;
  }
  async deleteTask(id: ObjectID): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async updateTaskById(id: ObjectID, status: taskStatus) {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
