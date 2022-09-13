import { IsEnum } from 'class-validator';
import { taskStatus } from '../task.entity';

export class UpdateTaskStatusDto {
  @IsEnum(taskStatus)
  status: taskStatus;
}
