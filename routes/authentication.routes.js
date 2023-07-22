import { Router } from "express"
import authenticationControllers from "../controllers/authentication.controllers.js"
const router = Router()

router.post('/signup/classic', (req, res) => authenticationControllers.signupClassic(req, res))

export default router