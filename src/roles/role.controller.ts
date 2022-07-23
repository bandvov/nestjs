import { CreateRoleDTO } from './../dto/role.dto';
import { RolesService } from './role.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}
  @Post('/create')
  createRole(@Body() dto: CreateRoleDTO) {
    return this.roleService.createRole(dto);
  }
  @Get('/:value')
  getRole(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
