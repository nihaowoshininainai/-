import { Module } from '@nestjs/common';
import { ImgController } from './img.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Img } from 'src/entity/img';
import { User } from 'src/entity/user';
import { ImgService } from './img.service';

@Module({
  imports: [TypeOrmModule.forFeature([Img, User])],
  providers: [ImgService],
  controllers: [ImgController]
})
export class ImgModule { }
