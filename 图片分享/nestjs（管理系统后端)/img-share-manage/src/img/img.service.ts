import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Img } from 'src/entity/img';
import { Result } from 'src/util/result';
import { Repository } from 'typeorm';

@Injectable()
export class ImgService {
    constructor(
        @InjectRepository(Img)
        private imgRepository:Repository<Img>
    ) { }
    async getAll() {
        return Result.ok(await this.imgRepository.find())
    }
    async getByName(name:string) {
        return Result.ok(await this.imgRepository.createQueryBuilder('img').where("iname like :iname",{iname:'%'+name+'%'}).getMany())
    }
    async delById(id: number) {
        const affected = (await this.imgRepository.delete(id)).affected
        if (affected === 1)
            return Result.ok(null, "删除成功")
        else
            return Result.no("删除失败")
    }
}
