import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { of } from 'rxjs';
import { unlink, unlinkSync } from 'fs';

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
    FileInterceptor('file', {
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
  fileUpload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 1000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): any {
    return file;
  }

  @Get('downloadfile/:filename')
  findFile(@Param('filename') filename, @Res() res): any {
    return this.taskService.findFile(filename, res);
  }

  @Delete('deletefile/:filename')
  async deleteFile(@Param('filename') filename): Promise<any> {
    return this.taskService.deleteFile(filename);
  }
}
