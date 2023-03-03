import { Reservation } from "../entities/reservation.entity"
import { userRole } from "../schemas/user.schema"
import AppError from "../utils/appError"
import { AppDataSource } from "../utils/data-source"
import { findAppoinmentById } from "./appoinment.service"
import { findUserById } from "./user.service"

const reservatinRepo = AppDataSource.getRepository(Reservation)

export interface IcreateNewReservation {
    appoinment_id: string,
    user_id: string,
    role: userRole
}

export const createNewReservation = async ({ appoinment_id, user_id, role }: IcreateNewReservation) => {
    const appionment = await findAppoinmentById(appoinment_id)
    if (!appionment) {
        throw new AppError(400, 'This Appoinment is not found any more.')
    }
    const user = await findUserById(user_id)
    if (!user) {
        throw new AppError(400, 'User is not logedin.')
    }
    const newReservation = reservatinRepo.create()
    if (role === userRole.admin) {
        newReservation.admin_confirm = true
    } else {
        newReservation.user_confirm = true
    }
    newReservation.user = user;
    newReservation.appoinment = appionment

    return await newReservation.save()
}

export const deleteReservation = async (reservation_id: string) => {
    const reservation = await findReservationById(reservation_id)
    if (!reservation) {
        throw new AppError(400, 'This reservation is not found any more.')
    }
    return await reservatinRepo.delete({
        id: reservation_id
    })
}

export const findReservationById = async (reservation_id: string) => {
    return await reservatinRepo.findOneBy({ id: reservation_id })
}
export const getAllReservation = async (user_id: string) => {
    return await reservatinRepo.createQueryBuilder('reservation')
        .leftJoinAndSelect('reservation.appoinment', 'appoinment')
        .where('reservation.user_id = :user_id', { user_id })
        .getMany()

}