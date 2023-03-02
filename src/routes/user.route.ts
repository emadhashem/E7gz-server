import { Router } from "express";
import { getMeHandler } from "../controllers/user.controller";
import { deserializeUser } from "../middlewares/deserializeUser.middleware";
import { requiredUser } from "../middlewares/requiredUser.middleware";

const router = Router()
router.get('/me' , deserializeUser , requiredUser, getMeHandler)

export default router