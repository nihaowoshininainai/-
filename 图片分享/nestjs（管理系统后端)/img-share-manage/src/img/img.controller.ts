import { Controller, Get, Query } from '@nestjs/common';
import { ImgService } from './img.service';

@Controller('img')
export class ImgController {
    constructor(
        private imgService:ImgService
    ) { }
    
    @Get('getall')
    getAll() {
        return this.imgService.getAll()
    }
    @Get('getByName')
    getByName(@Query() query: any) {
        return this.imgService.getByName(query.name)
    }
    @Get('delById')
    delBYId(@Query() query: any) {
        return this.imgService.delById(query.id)
    }
}
