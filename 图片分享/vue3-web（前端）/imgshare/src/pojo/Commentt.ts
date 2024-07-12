import type { Img } from "./Img"
import type { User } from "./User"

export class Commentt {
    cid: number = -1
    img: Img | null = null
    commdate: string = ''
    user: User | null = null
    clicklike: number = 0
    content: string = ''
    constructor() {

    }
}