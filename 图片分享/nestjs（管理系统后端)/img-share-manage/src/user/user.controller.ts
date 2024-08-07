import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get('getall')
    getAll() {
        return this.userService.findAll()
    }
    @Get('getByName')
    getByName(@Query() query: any) {
        return this.userService.findByName(query.uname)
    }
    @Get('delById')
    async delById(@Query() query: any) {
        return await this.userService.delById(query.id)
    }
}
