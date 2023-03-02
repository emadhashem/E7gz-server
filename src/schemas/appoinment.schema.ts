import { z, TypeOf } from "zod";


export const createNewAppionmentSchema = z.object({
    body: z.object({
        start: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
        end: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
        msg: z.string(),
        title: z.string()
    })
})

export type createNewAppionmentInputType = TypeOf<typeof createNewAppionmentSchema>['body']