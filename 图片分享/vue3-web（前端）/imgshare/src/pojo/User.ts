import type { Commentt } from "./Commentt"
import type { Img } from "./Img"

export class User {
    uid: number = -1
    uname: string = ''
    pwd: string = ''
    img: Img[] = []
    comment: Commentt[] = []
    likeImgs: Img[] = []
    constructor(
    ) {

    }
}
