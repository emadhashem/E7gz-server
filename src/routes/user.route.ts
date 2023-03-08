import { Router } from "express";
import { getMeHandler, searchUserHandler } from "../controllers/user.controller";
import { deserializeUser } from "../middlewares/deserializeUser.middleware";
import { parseSearchText } from "../middlewares/parseSearchText.middleware";
import { requiredUser } from "../middlewares/requiredUser.middleware";

const router = Router()
router.use(deserializeUser , requiredUser)
router.get('/me' , getMeHandler)
router.get('/search_user/:data' , parseSearchText , searchUserHandler)

export default router