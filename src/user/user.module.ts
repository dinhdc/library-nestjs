import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthHelper } from './auth.helper';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AbilityModule],
  controllers: [UserController],
  providers: [UserService, AuthHelper, JwtService],
})
export class UserModule {}
