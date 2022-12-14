import { AuthModule } from './../auth/auth.module';
import { RolesModule } from './../roles/role.module';
import { Role } from './../roles/role.schema';
import { UserRoles } from './user.role.schema';
import { User } from './users.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, UserRoles, Role]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
