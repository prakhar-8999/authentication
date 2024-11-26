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
import { jwtConstants } from 'src/constants/jwtSecretKey';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: UsersService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    let payload

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
    } catch (error) {
      console.log(error);
    }
    

    if(!payload){
      throw new UnauthorizedException("token is invalid or expired!");
    }

    

    const user: any = await this.userRepository.findById(payload.userId);
    

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
