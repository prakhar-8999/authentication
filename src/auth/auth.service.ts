import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

export interface loginResponseInterface {
  signInStatus: boolean;
  token: string;
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string
  ): Promise<loginResponseInterface> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Invalid User!');
    }
    const isValid = await bcrypt.compare(pass, user?.PasswordHash);

    if (!isValid) {
      throw new UnauthorizedException('Incorrect Password!');
    }
    const role = await this.usersService.findRole(user.Id);

    if (!role) {
      throw new UnauthorizedException('No role assigned!');
    }

    const payload = {
      UserId: user.Id,
      username: user.Email,
      Role: role.role.Name,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
    };

    return {
      signInStatus: isValid,
      token: await this.jwtService.signAsync(payload),
      userId: user.Id,
    };
  }

  // eslint-disable-next-line require-await
  async register(userData: any) {
    return this.usersService.create(userData);
  }
}
