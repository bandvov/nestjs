import { CreateRoleDTO } from './../dto/role.dto';
import { RolesService } from './role.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/auth.role.decorators';
import { RolesGuard } from './role.guard';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}
  @Roles(['ADMIN'])
  @UseGuards(RolesGuard)
  @Post('/create')
  createRole(@Body() dto: CreateRoleDTO) {
    return this.roleService.createRole(dto);
  }
  @Get('/:value')
  getRole(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
