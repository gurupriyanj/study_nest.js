import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TaskService) {}
  @UseGuards(RolesGuard)
  @Get()
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
  @Post('fileupload')
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: { fileSize: 100000 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now();
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  fileUpload(@UploadedFiles() file: Array<Express.Multer.File>): any {
    return file;
  }

  @Get('downloadfile/:filename')
  async findFile(@Param('filename') filename, @Res() res): Promise<any> {
    const file = await this.taskService.findFile(filename, res);
    if (!file) {
      return 'not found';
    }
    return file;
  }

  @Delete('deletefile/:filename')
  async deleteFile(@Param('filename') filename): Promise<any> {
    return this.taskService.deleteFile(filename);
  }
}
