import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import { BaseModel } from "./base.model";
import bycrpt from 'bcryptjs'
import { Appoinment } from "./appoinment.entity";
import { Reservation } from "./reservation.entity";
@Entity('users')
export class User extends BaseModel {
    @Column()
    name : string

    @Column({
        unique : true
    })
    @Index("email_index")
    email : string

    @Column()
    password : string

    @Column()
    role : string

    @OneToMany(() => Appoinment, (appionment) => appionment.admin)
    appionments : Appoinment[]

    @OneToMany(() => Reservation, reservation => reservation.user)
    reservations : Reservation[]
    toJSON() {
        return {...this , password : undefined}
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bycrpt.hash(this.password , 12)
    }

    static async comparePasswords(candidatePass : string , hashedPass : string) {
        return await bycrpt.compare(candidatePass , hashedPass);
    }
}
