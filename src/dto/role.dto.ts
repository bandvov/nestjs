import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDTO {
  @ApiProperty({ name: 'value', default: 'USER' })
  value: string;
  @ApiProperty({ name: 'description', default: '' })
  description: string;
}
