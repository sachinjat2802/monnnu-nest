import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from '../public/Auth/auth.module';
import { OtherModule } from './Other/other.module';


@Module({
  imports: [
    RouterModule.register([
        {
          path: '/auth',
          module:AuthModule,
        },
        {
          path: '/other',
          module: OtherModule,
  
        },
      ]),
  ],
   
})
export class PublicModule {}
