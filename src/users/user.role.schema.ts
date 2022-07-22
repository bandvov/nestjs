import { User } from './users.schema';
import { Role } from './../roles/role.schema';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';

@Table({
  tableName: 'user_roles',
  timestamps: true,
})
export class UserRoles extends Model {
  @ApiProperty({ name: 'id', default: '1' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;

  @ApiProperty({ name: 'userId', default: '12345', required: true })
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
  })
  userId: string;

  @ApiProperty({ name: 'roleId', default: '12345', required: true })
  @ForeignKey(() => Role)
  @Column({
    type: DataType.STRING,
  })
  roleId: string;
}
