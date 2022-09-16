import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UserRoles } from './userRole.enum';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    console.log(req?.user, 'vfkpmpo');
    if (req?.user) {
      return req?.user?.role === UserRoles.ADMIN;
    }

    return false;
  }
}
