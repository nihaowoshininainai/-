import type { Commentt } from "./Commentt"
import type { User } from "./User"

export class Img{
    iid:number = -1
    iname:string = ''
    isrc:string =''
    uploaddate:string = ''
    user:User | null = null
    pageview:number = 0
    comment:Commentt[] = []
    likeUsers:User[] = []
    constructor(
    ){
        
    }
}