import { Request, Response, NextFunction } from "express";
import { success } from "../global";
import { createNewAppoinmentInputType, DeleteAppoinmentInputType, GetAppoinmentsByTitleInputType } from "../schemas/appoinment.schema";
import { createNewappoinment, deleteAppoinment, getAppoinmentsByTitle } from "../services/appoinment.service";


export const addNewAppoinmentHandler = async (
    req: Request<{}, {}, createNewAppoinmentInputType>, res: Response, next: NextFunction
) => {
    try {
        const { start, end, msg, title } = req.body
        const newAppoinment = await createNewappoinment({
            start, end, msg, title, admin: res.locals.user.id
        })
        res.send(newAppoinment)
    } catch (error) {
        next(error)
    }
}
export const getAppoinmentsByTitleHandler = async (
    req: Request<{}, {}, {}, GetAppoinmentsByTitleInputType>, res: Response, next: NextFunction
) => {
    try {
        const { title } = req.query
        const admin = res.locals.user.id
        const data = await getAppoinmentsByTitle(title, admin)
        res.send({
            status: success,
            data
        })
    } catch (error) {
        next(error)
    }
}

export const deleteAppoinmentHandler =async (
    req : Request<{} , {} , DeleteAppoinmentInputType>, res : Response, next : NextFunction
) => {
    try {
        const admin = res.locals.user.id
        const {appoinment_id} = req.body
        const affected = await deleteAppoinment(appoinment_id)
        res.send({
            status : success,
            affected
        })
    } catch (error) {
        next(error)
    }
}