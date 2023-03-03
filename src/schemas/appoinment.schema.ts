import { z, TypeOf } from "zod";
import { deleteReservationSchema } from "./reservation.schema";


export const createNewAppoinmentSchema = z.object({
    body: z.object({
        start: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
        end: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
        msg: z.string(),
        title: z.string()
    })
})
export const getAppoinmentsByTitleSchema = z.object({
    query: z.object({
        title: z.string()
    })
})
export const DeleteAppoinmentSchema  = z.object({
    body: z.object({
        appoinment_id : z.string()
    })
})
export type createNewAppoinmentInputType = TypeOf<typeof createNewAppoinmentSchema>['body']
export type GetAppoinmentsByTitleInputType = TypeOf<typeof getAppoinmentsByTitleSchema>['query']
export type DeleteAppoinmentInputType = TypeOf<typeof DeleteAppoinmentSchema>['body']
