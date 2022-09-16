// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// Injectable();
// export class RolesGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     console.log('belnn', context.switchToHttp().getRequest().user, 'vlfbjk');
//     // const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     // console.log(roles, context.getHandler());
//     return true;
//   }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log(this.reflector, 'this.reflector');
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles, 'ebfekj');
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user, 'nn;brn');
    return false;
  }
}
