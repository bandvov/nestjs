import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }
  @Post('/create')
  createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }
}
