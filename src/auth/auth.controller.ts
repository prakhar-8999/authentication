/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-await */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { UserInterface } from 'src/users/user.schema';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('auth/register')
  async register(@Body() registerData: UserInterface) {
    return this.authService.register(registerData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}


