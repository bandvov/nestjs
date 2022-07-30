import { BanUserDTO } from './../dto/ban-user.dto';
import { AddRoleDTO } from './../dto/add.role.dto';
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

  @ApiOperation({ summary: 'Should add role' })
  @ApiResponse({ status: 200, type: User })
  @Roles(['ADMIN'])
  @UseGuards(RolesGuard)
  @Post('/role')
  async addRole(@Body() role: AddRoleDTO) {
    return this.userService.addRole(role);
  }
  @ApiOperation({ summary: 'Should ban user' })
  @ApiResponse({ status: 200, type: User })
  @Roles(['ADMIN'])
  @UseGuards(RolesGuard)
  @Post('/ban')
  async ban(@Body() dto: BanUserDTO) {
    return this.userService.ban(dto);
  }
}
