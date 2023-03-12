import { Router } from "express";
import { addNewAppoinmentHandler, deleteAppoinmentHandler, getAllAppoinmentsHandler, getAppoinmentsByTitleHandler } from "../controllers/appoinment.controller";
import { deserializeUser } from "../middlewares/deserializeUser.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { requiredUser } from "../middlewares/requiredUser.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createNewAppoinmentSchema, DeleteAppoinmentSchema, getAppoinmentsByTitleSchema } from "../schemas/appoinment.schema";

const router = Router()
router.use(deserializeUser, requiredUser, isAdmin)
router.post('/add',
    validate(createNewAppoinmentSchema), addNewAppoinmentHandler
)
router.get('/get_appoinments_by_title', validate(getAppoinmentsByTitleSchema), getAppoinmentsByTitleHandler)
router.get('/all', getAllAppoinmentsHandler)
router.delete('/delete', validate(DeleteAppoinmentSchema), deleteAppoinmentHandler)


export default router