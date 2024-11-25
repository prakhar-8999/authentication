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

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('authenticate/register')
  async register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('authenticate/login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.Email, signInDto.Password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}


