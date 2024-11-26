import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { UserInterface } from 'src/users/user.schema';

export interface loginResponseInterface {
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
    const isValid = await bcrypt.compare(pass, user?.password);

    if (!isValid) {
      throw new UnauthorizedException('Incorrect Password!');
    }
    const role = await this.usersService.findRole(user.id);

    if (!role) {
      throw new UnauthorizedException('No role assigned!');
    }

    const payload = {
      userId: user.id,
      role: role.role.Name,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = await this.jwtService.signAsync(payload)
    
    return {
      token: token,
      userId: user.id,
    };
  }

  async register(userData: UserInterface) {
    return this.usersService.create(userData);
  }
}
