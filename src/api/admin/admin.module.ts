import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import {  PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';
@Module({
  imports: [
    RouterModule.register([
        {
          path: '/private',
          module:PrivateModule,
        },
        {
          path: '/public',
          module: PublicModule,
  
        },
      ]),
  ],
})
export class AdminModule {}
