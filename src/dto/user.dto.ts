import { IsString, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ name: 'email', default: 'test@test.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ name: 'pasword', default: 'addsad' })
  @IsString({ message: 'Should be a string' })
  @Length(8, 32)
  password: string;
}
