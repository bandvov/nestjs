import { CreateUserDTO } from './../dto/user.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/auth.role.decorators';
import { RolesGuard } from 'src/roles/role.guard';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @ApiOperation({ summary: 'Should return all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(['ADMIN'])
  @UseGuards(RolesGuard)
  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }
  @ApiOperation({ summary: 'Should create user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/create')
  async createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }
}
