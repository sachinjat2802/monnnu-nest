import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { User } from '../../../../models/auth.entity';
import { AuthService } from '../../../../service/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule {}
