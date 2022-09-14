import { Module } from '@nestjs/common';

import { TasksController } from './tasks.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), AuthModule],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {}
