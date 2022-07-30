import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDTO {
  @ApiProperty({ name: 'value', default: '' })
  value: string;
  @ApiProperty({ name: 'userId', default: '' })
  userId: string;
}
