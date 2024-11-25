import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from 'src/constants/decorators/AuthDecorator';
import { UsersService } from 'src/users/users.service';

import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: UsersService,
    private readonly reflector: Reflector // Use Reflector to access metadata // private readonly roles: string[] = []
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    const user: any = await this.userRepository.findById(payload.UserId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (roles && roles.length > 0) {
      if (!roles.includes(user.roleId)) {
        throw new ForbiddenException("You don't have access to this API!");
      }
    }

    request['user'] = user;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
