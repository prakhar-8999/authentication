import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthenticationGuard } from 'src/constants/decorators/AuthDecorator';
import { roles } from 'src/constants/roles';
import { User } from './user.entity';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @AuthenticationGuard([roles.ADMIN])
  @Get('')
  async getUsers(): Promise<User[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException(
        'Unable to get user list',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @AuthenticationGuard([roles.ADMIN, roles.USER])
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
