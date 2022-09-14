import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/signIn-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Signup User
  async signup(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { name, email, password } = createUserDto;
      const salt = await bcrypt.genSalt(10);
      console.log('salt', salt);

      const hashedPassword = await bcrypt.hash(password, salt);
      console.log('haa', hashedPassword);

      const newUser = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return newUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email alredy exists');
      } else {
        console.log('error', error);
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(signInUserDto: SignInUserDto): Promise<User> {
    try {
      const { email, password } = signInUserDto;
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      if (await bcrypt.compare(password, user?.password)) {
        return user;
      } else {
        throw new UnauthorizedException('password is incorrect');
      }
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException(error?.message);
      }
    }
  }
}
