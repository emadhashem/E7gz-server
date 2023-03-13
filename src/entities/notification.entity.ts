import { Column, Entity, Index } from "typeorm";
import { BaseModel } from "./base.model";

@Entity('notifications')
export class Notification extends BaseModel {

    @Index("notification_actor_index")
    @Column()
    actor_id: string

    @Index("notification_notifire_index")
    @Column()
    notifire_id: string

    @Column({
        default: false
    })
    status: boolean

    @Column()
    msg: string

}