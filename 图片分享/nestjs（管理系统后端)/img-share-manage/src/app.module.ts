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
      host: 'localhost',
      port: 3306,
      username: 'arks',
      password: 'oo8579353',
      database: 'mydb',
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