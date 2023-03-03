import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseModel } from "./base.model";
import { User } from "./user.entity";

@Entity("appoinments")
export class Appoinment extends BaseModel {
    
    @Column()
    start : string
    @Column()
    end : string

    @Column({
        nullable : false
    })
    msg : string
    
    @Index("appoinment_title_index")
    @Column()
    title : string

    @ManyToOne(() => User, user => user.appionments)
    @JoinColumn({
        name : 'admin_id'
    })
    admin: User
}