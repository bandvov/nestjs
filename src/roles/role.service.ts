import { Role } from './role.schema';
import { CreateRoleDTO } from './../dto/role.dto';
import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async createRole(dto: CreateRoleDTO) {
    console.log({ dto });

    return await this.roleRepository.create(dto);
  }
  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({
      where: { value },
    });
  }
}
