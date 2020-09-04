import { Controller, Get, Query, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  login(@Query('email') email: string, @Query('password') password: string) {
    return this.userService.tryLogin(email, password);
  }

  @Post()
  signUp(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.signUp(firstName, lastName, email, password);
  }
}
