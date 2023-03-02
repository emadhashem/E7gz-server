import { Router } from "express";
import { addNewAppoinmentHandler } from "../controllers/appoinment.controller";
import { success } from "../global";
import { deserializeUser } from "../middlewares/deserializeUser.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { requiredUser } from "../middlewares/requiredUser.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createNewAppionmentSchema } from "../schemas/appoinment.schema";

const router = Router()

router.post('/add', deserializeUser, requiredUser, isAdmin,
    validate(createNewAppionmentSchema), addNewAppoinmentHandler
)

export default router