import { RolesService } from './../roles/role.service';
import { CreateUserDTO } from './../dto/user.dto';
import { User } from './users.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private roleService: RolesService,
  ) {}
  async createUser(dto: CreateUserDTO) {
    const user = await this.userModel.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    return user.$set('roles', [role.id]);
  }
  getAllUsers() {
    return this.userModel.findAll();
  }
}
