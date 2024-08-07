import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Comment } from './comment'
@Entity()
export class Img extends BaseEntity{
    @PrimaryGeneratedColumn()
    iid: number
    @Column("varchar", { length:100})
    iname: string
    @Column("varchar", { length:100})
    isrc: string
    @Column("datetime")
    uploaddate: string
    @ManyToOne(() => User)
    @JoinColumn({
        name: 'uid',
        referencedColumnName:'uid'
    })
    uid: User
    @Column({default:0})
    pageview: number
    
    @ManyToMany(() => User, users => users.imgs)
    users: User[]
    @OneToMany(() => Comment, comment => comment.iid)
    comments:Comment[]
    
    

}