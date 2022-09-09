import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
})
export class AppModule {}
