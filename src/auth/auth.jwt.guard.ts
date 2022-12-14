import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      if (!token) {
        throw new UnauthorizedException('Not authorized');
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('Not authorized');
    }
  }
}
