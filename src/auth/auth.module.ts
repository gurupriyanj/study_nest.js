import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { JwtStrategy } from './jwt.starategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role.guard';

config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtService, PassportModule],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
