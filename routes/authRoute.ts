import express from "express"
import UsersController from "../controllers/usersController.js"
import { validateLoginRequest } from "../middlewares/loginReqValidate.js"

const router = express.Router()

router.post("/", validateLoginRequest, UsersController.login)

export default router;