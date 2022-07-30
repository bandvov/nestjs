import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
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
    const { id, email, roles } = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return await this.generateToken({
      id,
      email,
      roles,
    });
  }

  async login(userDto: CreateUserDTO) {
    const user = await this.validateUser(userDto);
    console.log('user', user);

    if (user) {
      return this.generateToken({
        id: user.id,
        email: user.email,
        roles: user.roles,
      });
    }
  }

  private generateToken(data) {
    return this.jwtService.sign(data, { expiresIn: '24h' });
  }
  private async validateUser(dto: CreateUserDTO) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const passwordEqual = await bcrypt.compare(dto.password, user.password);
    console.log('equal', passwordEqual);

    if (passwordEqual) {
      return user;
    } else {
      throw new UnauthorizedException('Password or email not correct');
    }
  }
}
