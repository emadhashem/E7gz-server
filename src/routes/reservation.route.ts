import { Router } from "express";
import { reactToReservationHandler, createNewReservationHandler, getAllReservationHandler, getReservationByIdHandler } from "../controllers/reservation.controller";
import { deserializeUser } from "../middlewares/deserializeUser.middleware";
import { requiredUser } from "../middlewares/requiredUser.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createNewReservationSchema, updateReservationschema } from "../schemas/reservation.schema";

const router = Router()

router.use(deserializeUser, requiredUser)
router.post('/add', validate(createNewReservationSchema), createNewReservationHandler)
router.put('/react_to_reservation', validate(updateReservationschema), reactToReservationHandler)
router.get('/all_user_reservation' , getAllReservationHandler)
router.get('/get_reservation_by_id/:reservation_id' , getReservationByIdHandler)

export default router