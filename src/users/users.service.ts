import { User } from './users.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async createUser(dto: CreateUserDTO) {
    const user = await this.userModel.create(dto);
    return user;
  }
  getAllUsers() {
    return this.userModel.findAll();
  }
}
