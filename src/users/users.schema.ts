import { UserRoles } from './user.role.schema';
import { Role } from './../roles/role.schema';
import { ApiProperty } from '@nestjs/swagger';

import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
interface IUserCreation {
  password: string;
  email: string;
}
@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User, IUserCreation> {
  @ApiProperty({ name: 'id', default: '1' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;

  @ApiProperty({ name: 'pasword', default: 'addsad', required: true })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ name: 'email', default: 'test@test.com', required: true })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ name: 'banned', default: 'false' })
  @Column({
    type: DataType.BOOLEAN,
  })
  banned: boolean;

  @ApiProperty({ name: 'bannedReason', default: '' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bannedReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
