import { UserRoles } from './users/user.role.schema';
import { Role } from './roles/role.schema';
import { User } from './users/users.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      host: process.env.SEQUELIZE_HOST,
      port: +process.env.SEQUELIZE_PORT,
      username: process.env.SEQUELIZE_USERNAME,
      password: process.env.SEQUELIZE_PASSWORD,
      database: process.env.SEQUELIZE_DATABASE,
      dialect: 'postgres',
      autoLoadModels: true,
      models: [User, Role, UserRoles],
    }),
    UsersModule,
    RolesModule,
  ],
})
export class AppModule {}
