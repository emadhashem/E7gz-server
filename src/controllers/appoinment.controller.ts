import { Request, Response, NextFunction } from "express";
import { createNewAppionmentInputType } from "../schemas/appoinment.schema";
import { createNewAppionment } from "../services/appoinment.service";


export const addNewAppoinmentHandler = async (
    req: Request<{}, {}, createNewAppionmentInputType>, res: Response, next: NextFunction
) => {
    try {
        const { start, end, msg, title } = req.body
        const newAppionment = await createNewAppionment({
            start, end, msg, title, admin: res.locals.user.id
        })
        res.send(newAppionment)
    } catch (error) {
        next(error)
    }
}