import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Img } from "./img";
import { User } from "./user";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    cid: number
    @ManyToOne(() => Img)
    @JoinColumn({
        name: 'iid',
        referencedColumnName: 'iid'
    })
    iid: Img
    @Column('datetime')
    commdate: string
    @ManyToOne(()=>User)
    @JoinColumn({
        name: 'uid',
        referencedColumnName: 'uid'
    })
    uid:User
    @Column()
    clicklike: number
    @Column('text')
    content: string
    
    @ManyToMany(() => User, users => users.likecomments)
    users:User[]
}