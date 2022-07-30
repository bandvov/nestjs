import { ApiProperty } from '@nestjs/swagger';

export class BanUserDTO {
  @ApiProperty({ name: 'userId', default: '' })
  userId: string;
  @ApiProperty({ name: 'banReason', default: '' })
  banReason: string;
}
