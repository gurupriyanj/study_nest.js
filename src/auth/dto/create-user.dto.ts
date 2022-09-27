import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @MinLength(4)
  @MaxLength(15)
  password: string;
}
