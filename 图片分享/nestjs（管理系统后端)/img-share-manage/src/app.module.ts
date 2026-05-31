import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Img, Comment } from './entity';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ImgModule } from './img/img.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'arks',
      password: process.env.DB_PASSWORD || 'oo8579353',
      database: process.env.DB_DATABASE || 'mydb',
      entities: [User, Img, Comment],
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Img]),
    TypeOrmModule.forFeature([Comment]),
    UserModule,
    CommentModule,
    ImgModule,
    DashboardModule
  ]
})
export class AppModule { }