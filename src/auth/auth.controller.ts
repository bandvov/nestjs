import { ValidationPipe } from './../pipes/validation.pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../dto/user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() userDto: CreateUserDTO) {
    return this.authService.login(userDto);
  }
  @Post('/registration')
  registration(@Body() userDto: CreateUserDTO) {
    return this.authService.register(userDto);
  }
}
