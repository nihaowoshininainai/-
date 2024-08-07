import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Img } from "./img";
import { Comment } from "./comment";
@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    uid: number
    @Column("varchar",{length:100})
    uname: string
    @Column("varchar",{length:100})
    pwd: string

    @OneToMany(() => Comment, comments => comments.uid)
    comments: Comment[]
    @OneToMany(() => Img, imgs => imgs.uid)
    imgs:Img[]
    @ManyToMany(() => Img)
    @JoinTable({
        name: 'ulilke',
        joinColumn: {
            name: 'uid',
            referencedColumnName: 'uid'
        },
        inverseJoinColumn: {
            name: 'iid',
            referencedColumnName:'iid'
        }
    })
    likeImg: Img[]
    @ManyToMany(() => Comment)
    @JoinTable({
        name: 'clicklike',
        joinColumn: {
            name: 'uid',
            referencedColumnName:'uid'
        },
        inverseJoinColumn: {
            name: 'cid',
            referencedColumnName:'cid'
        }
    })
    likecomments:Comment[]
}