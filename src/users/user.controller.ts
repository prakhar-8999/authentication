import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  async getUsers(): Promise<any[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException(
        'Unable to get user list',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<any> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // @Get("getUsers")
  // async findAll(): Promise<User[]> {
  //   return this.userService.findAll();
  // }
}
