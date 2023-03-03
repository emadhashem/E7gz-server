import { Router } from "express";
import { cancelReservationHandler, createNewReservationHandler, getAllReservationHandler } from "../controllers/reservation.controller";
import { success } from "../global";
import { deserializeUser } from "../middlewares/deserializeUser.middleware";
import { requiredUser } from "../middlewares/requiredUser.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createNewReservationSchema, deleteReservationSchema } from "../schemas/reservation.schema";

const router = Router()

router.use(deserializeUser, requiredUser)
router.post('/add', validate(createNewReservationSchema), createNewReservationHandler)
router.delete('/cancel', validate(deleteReservationSchema), cancelReservationHandler)
router.get('/myReservations' , getAllReservationHandler)

export default router