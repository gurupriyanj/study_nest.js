import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signIn-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  signIn(@Body() signInUserDto: SignInUserDto): Promise<any> {
    return this.authService.signIn(signInUserDto);
  }
}
