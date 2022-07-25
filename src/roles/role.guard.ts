import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles: string[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const req = context.switchToHttp().getRequest();
    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      if (!token) {
        throw new UnauthorizedException('Not authorized');
      }
      const user = this.jwtService.verify(token);
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      console.error(e);
      throw new HttpException('Not allowed', HttpStatus.FORBIDDEN);
    }
  }
}
