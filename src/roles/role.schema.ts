import { UserRoles } from './../users/user.role.schema';
import { User } from './../users/users.schema';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface IRoleCreation {
  value: string;
  description: string;
}

@Table({
  tableName: 'roles',
  timestamps: true,
})
export class Role extends Model<Role, IRoleCreation> {
  @ApiProperty({ name: 'id', default: '1' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;

  @ApiProperty({
    name: 'value',
    description: 'Unique role',
    default: 'USER',
    required: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'USER',
  })
  value: string;

  @ApiProperty({
    name: 'description',
    description: 'Description for user role',
    default: '',
    required: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
