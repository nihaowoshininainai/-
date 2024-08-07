import { Module } from '@nestjs/common';
import { ImgController } from './img.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Img } from 'src/entity/img';
import { ImgService } from './img.service';

@Module({
  imports: [TypeOrmModule.forFeature([Img])],
  providers: [ImgService],
  controllers:[ImgController]
})
export class ImgModule {}
