import { NextFunction, Request, Response } from "express";
import { success } from "../global";
import { CreateNewReservationInputType, UpdateReservationInputType } from "../schemas/reservation.schema";
import { userRole } from "../schemas/user.schema";
import { adminAcceptReservation, createNewReservation, deleteReservation, getAllReservation, getReservationById, userAcceptReservation } from "../services/reservation.service";
import AppError from "../utils/appError";

export const createNewReservationHandler = async (
    req: Request<{}, {}, CreateNewReservationInputType>, res: Response, next: NextFunction
) => {
    try {
        let { appoinment_id, user_id } = req.body
        const { role } = res.locals.user
        if (role === userRole.user) {
            user_id = res.locals.user.id
        }
        if (user_id) {
            const newReservation = await createNewReservation({
                appoinment_id, user_id, role
            })
            res.send({
                status: success, data: newReservation
            })
        } else return next(new AppError(400, 'User not found'))

    } catch (error) {
        next(error)
    }
}
export const reactToReservationHandler = async (
    req: Request<{}, {}, UpdateReservationInputType>, res: Response, next: NextFunction
) => {
    try {
        const { role } = res.locals.user
        const { reservation_id, accepte } = req.body
        if (accepte) {
            if (role === userRole.admin) {
                const data = await adminAcceptReservation(reservation_id)
                res.send({
                    status : success,
                    data
                })
            } else {
                const data = await userAcceptReservation(reservation_id)
                res.send({
                    status : success,
                    data
                })
            }
        } else {
            const data = await deleteReservation(reservation_id)
            res.send({
                status : success,
                data
            })
        }
    } catch (error) {
        next(error)
    }
}

export const getAllReservationHandler = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const user_id = res.locals.user.id
        const data = await getAllReservation(user_id)
        res.send({
            status: success,
            data
        })
    } catch (error) {
        next(error)
    }
}

export async function getReservationByIdHandler(
    req: Request, res: Response, next: NextFunction
) {
    try {
        const {reservation_id} = req.params
        const data = await getReservationById(reservation_id)
        res.send({
            status : success,
            data
        })
    } catch (error) {
        next(error)
    }
}