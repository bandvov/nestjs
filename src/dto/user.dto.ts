import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ name: 'email', default: 'test@test.com' })
  email: string;
  @ApiProperty({ name: 'pasword', default: 'addsad' })
  password: string;
}
