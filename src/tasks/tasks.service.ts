import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, taskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-taskFilter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getAllTasks() {
    const allTasks = await this.taskModel.find();
    return allTasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException(`Task with ID ${id} Not found`);
    return task;
  }

  async createTask(createTasdDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTasdDto;
    const newTask = new this.taskModel({
      title,
      description,
      status: taskStatus.OPEN,
    });
    await newTask.save();
    return newTask;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException(`Task with ID ${id} Not found`);
    task.remove();
  }

  async updateTaskById(id: string, status: taskStatus): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, { status: status });
    return task;
  }

  async getTasksWithFilters(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status } = filterDto;
    if (status) {
      const tasks = await this.taskModel.find({ status: status });
      return tasks;
    }
  }
}
