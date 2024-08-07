import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user';
import { Result } from 'src/util/result';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) { }
    async findAll(){
        return Result.ok(await this.userRepository.find())
    }
    async findByName(uname: string){
        return Result.ok(await this.userRepository.createQueryBuilder('user').where('user.uname like :uname',{uname:`%${uname}%`}).getMany())
    }
    async delById(id: number) {
        const affected = (await this.userRepository.delete(id)).affected
        if (affected === 1)
            return Result.ok(null, "删除成功")
        else
            return Result.no("删除失败")
    }
    
}