import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user';
import { Img } from 'src/entity/img';
import { Comment } from 'src/entity/comment';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Img, Comment])],
    controllers: [DashboardController],
    providers: [DashboardService]
})
export class DashboardModule { }