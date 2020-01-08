import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let user = request.jwt_user //as IUser
    for (const role of user.user_roles) {
      if (role.role === 'admin') {
        return true;
      }
    }
    return false;
  }
}
