import { AddRoleDTO } from './../dto/add.role.dto';
import { Role } from './role.schema';
import { CreateRoleDTO } from './../dto/role.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async createRole(dto: CreateRoleDTO) {
    return await this.roleRepository.create(dto);
  }
  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({
      where: { value },
    });
  }
}
