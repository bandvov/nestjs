import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from './../users/users.schema';
import { UserRoles } from './../users/user.role.schema';
import { Role } from './role.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RolesService } from './role.service';
import { RolesController } from './role.controller';

@Module({
  providers: [RolesService, JwtService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
