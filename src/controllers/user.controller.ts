import { NextFunction, Request, Response } from "express";
import { success } from "../global";
import { searchUserByName } from "../services/user.service";


export const getMeHandler = async (req : Request ,res : Response , next : NextFunction) => {
    try {
        const user = res.locals.user
        res.status(200).json({
            status : 'success',
            data : {
                user
            }
        })
    } catch (error) {
        next(error)
    }

}

export const searchUserHandler = async (
    req : Request ,res : Response , next : NextFunction
) => {
    try {
        const data = await searchUserByName(res.locals.searchText)
        res.send({
            status : success,
            data
        }) 
    } catch (error) {
        next(error)
    }
}