import { TypeOf, z } from "zod";

export const createNewReservationSchema = z.object({
    body: z.object({
        appoinment_id: z.string(),
        user_id: z.string().nullable()
    })
})
export const updateReservationschema = z.object({
    body: z.object({
        reservation_id: z.string(),
        accepte : z.boolean()
    })
})

export type CreateNewReservationInputType = TypeOf<typeof createNewReservationSchema>['body']
export type UpdateReservationInputType = TypeOf<typeof updateReservationschema>['body']