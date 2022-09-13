import { IsEnum, IsOptional } from 'class-validator';
import { taskStatus } from '../task.entity';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(taskStatus)
  status?: taskStatus;
}
