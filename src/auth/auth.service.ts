import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { CreateUserDTO } from './../dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './../users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(userDto: CreateUserDTO) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      return new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 8);
    const newUser = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return await this.generateToken(newUser as User);
  }

  login(userDto: CreateUserDTO) {
    return this.userService.
  }

  async generateToken({ id, email, roles }) {
    return this.jwtService.sign({ id, email, roles }, { expiresIn: '24h' });
  }
}
