import { CreateUserDTO } from './../dto/user.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @ApiOperation({ summary: 'Should return all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }
  @ApiOperation({ summary: 'Should create user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/create')
  createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }
}
