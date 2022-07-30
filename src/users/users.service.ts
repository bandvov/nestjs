import { ValidationPipe } from './../pipes/validation.pipe';
import { BanUserDTO } from './../dto/ban-user.dto';
import { AddRoleDTO } from './../dto/add.role.dto';
import { RolesService } from './../roles/role.service';
import { CreateUserDTO } from './../dto/user.dto';
import { User } from './users.schema';
import {
  Injectable,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private roleService: RolesService,
  ) {}
  async createUser(dto: CreateUserDTO) {
    const user = await this.userModel.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }
  getAllUsers() {
    return this.userModel.findAll({ include: 'roles' });
  }
  getUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email }, include: 'roles' });
  }
  async addRole(dto: AddRoleDTO) {
    const user = await this.userModel.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }
  async ban(dto: BanUserDTO) {
    const user = await this.userModel.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
