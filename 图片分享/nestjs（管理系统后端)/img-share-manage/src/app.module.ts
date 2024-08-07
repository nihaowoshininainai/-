import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user';
import { UserModule } from './user/user.module';
import { Img } from './entity/img';
import { Comment } from './entity/comment';
import { CommentModule } from './comment/comment.module';
import { ImgModule } from './img/img.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'oo8579353',
      database: 'mydb',
      entities: [User,Img,Comment],
    }),
    UserModule,
    CommentModule,
    ImgModule
  ]
})
export class AppModule {}
