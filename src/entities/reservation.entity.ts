import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Appoinment } from "./appoinment.entity";
import { BaseModel } from "./base.model";
import { User } from "./user.entity";

@Entity('reservations')
export class Reservation extends BaseModel {

    @Column({
        default : false
    })
    admin_confirm: boolean

    @Column({
        default : false
    })
    user_confirm: boolean

    @ManyToOne(() => User, (user) => user.reservations)
    @JoinColumn({
        name: 'user_id'
    })
    user: User

    @OneToOne(() => Appoinment)
    @JoinColumn({
        name : 'appionment_id'
    })
    appoinment : Appoinment
} 