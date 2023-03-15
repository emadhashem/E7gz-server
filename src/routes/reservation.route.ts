import { Router } from "express";
import { cancelReservationHandler, createNewReservationHandler, getAllReservationHandler } from "../controllers/reservation.controller";
import { deserializeUser } from "../middlewares/deserializeUser.middleware";
import { requiredUser } from "../middlewares/requiredUser.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createNewReservationSchema, deleteReservationSchema } from "../schemas/reservation.schema";

const router = Router()

router.use(deserializeUser, requiredUser)
router.post('/add', validate(createNewReservationSchema), createNewReservationHandler)
router.delete('/cancel', validate(deleteReservationSchema), cancelReservationHandler)
router.get('/all_user_reservation' , getAllReservationHandler)
router.get('/get_reservation_by_id/:reservation_id' , (req , res) => {
    
})
export default router