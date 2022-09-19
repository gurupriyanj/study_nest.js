import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { TaskEntity } from './tasks/task.entity';
import { MulterModule } from '@nestjs/platform-express';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [User, TaskEntity],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
