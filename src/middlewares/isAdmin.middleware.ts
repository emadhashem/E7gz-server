import { NextFunction, Request, Response } from "express";
import { userRole } from "../schemas/user.schema";
import AppError from "../utils/appError";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { role } = res.locals.user
    if (role !== userRole.admin) {
        return next(new AppError(401, 'You are not authorized to make this request'))
    }
    next()
}