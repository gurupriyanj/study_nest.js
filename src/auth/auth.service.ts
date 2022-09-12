import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './auth.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;
    const newUser = this.userRepository.create({
      name,
      email,
    });

    await newUser.save();
    console.log('name and email', name, email);

    return {
      message: 'user created',
      user: newUser,
    };
  }
  //   signin() {}
}
