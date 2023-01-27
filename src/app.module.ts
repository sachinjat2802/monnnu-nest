import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './api/admin/admin.module';
import { PrivateModule } from './api/admin/private/private.module';
import { AuthModule } from './api/admin/public/Auth/auth.module';
import { OtherModule } from './api/admin/public/Other/other.module';
import { PublicModule } from './api/admin/public/public.module';
// import { ClientModule } from './api/client/client.module';
import { User } from './models/auth.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires



@Module({
  imports: [
   TypeOrmModule.forRoot({
      type: "postgres",
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '__monnu__',
      database: 'monnu',
      autoLoadEntities: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([User]),
    AdminModule,
    PublicModule,
    AuthModule,
    OtherModule,
    RouterModule.register([
      {
        path: '/admin',
        module: AdminModule,
        children:[
          {
            path: '/private',
            module:PrivateModule,
            children:[
              {
                path: '/auth',
                module:AuthModule,
              },
              {
                path: '/other',
                module: OtherModule,
        
              },
            ]
          },
          {
            path: '/public',
            module: PublicModule,
            children:[
              {
                path: '/auth',
                module:AuthModule,
              },
              {
                path: '/other',
                module: OtherModule,
        
              },
            ]
            
    
          },
        ]
        },
        
      
    ])],
  
  })
export class AppModule {}

