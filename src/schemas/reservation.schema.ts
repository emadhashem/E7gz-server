import { TypeOf, z } from "zod";

export const createNewReservationSchema = z.object({
    body: z.object({
        appoinment_id: z.string(),
        user_id: z.string().nullable()
    })
})
export const deleteReservationSchema = z.object({
    body: z.object({
        reservation_id: z.string(),
    })
})

export type CreateNewReservationInputType = TypeOf<typeof createNewReservationSchema>['body']
export type DeleteReservationInputType = TypeOf<typeof deleteReservationSchema>['body']