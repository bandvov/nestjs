import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserCreation {
  password: string;
  email: string;
}
@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User, IUserCreation> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  banned: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bannedReason: string;
}
