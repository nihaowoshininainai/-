import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity('img')
export class Img extends BaseEntity {
    @PrimaryGeneratedColumn()
    iid: number
    @Column("varchar", { length: 100 })
    iname: string
    @Column("varchar", { length: 100 })
    isrc: string
    @Column("datetime")
    uploaddate: string
    @ManyToOne(() => User)
    @JoinColumn({
        name: 'uid',
        referencedColumnName: 'uid'
    })
    uid: any
    @Column({ default: 0 })
    pageview: number

    @ManyToMany(() => User, (users: any) => users.imgs)
    users: any[]

    @OneToMany('Comment', 'iid')
    comments: any[]
}