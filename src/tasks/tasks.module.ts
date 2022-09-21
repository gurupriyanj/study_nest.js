import { Module } from '@nestjs/common';

import { TasksController } from './tasks.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {}
