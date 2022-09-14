import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsString()
  email: string;

  @MinLength(4)
  @MaxLength(15)
  password: string;
}
