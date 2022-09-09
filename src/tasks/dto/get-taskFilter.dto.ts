import { IsEnum, IsOptional } from 'class-validator';
import { taskStatus } from '../task.model';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(taskStatus)
  status?: taskStatus;
}
