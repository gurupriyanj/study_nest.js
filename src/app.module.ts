import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { TaskEntity } from './tasks/task.entity';
import { MulterModule } from '@nestjs/platform-express';
import { appConfig } from './config/app.config';
import { DatabaseConfig } from './config/database.config';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
