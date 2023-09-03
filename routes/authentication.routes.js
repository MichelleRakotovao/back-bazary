import { Router } from "express"
import authenticationControllers from "../controllers/authentication.controllers.js"
const router = Router()

router.post('/signup/classic', (req, res) => authenticationControllers.signupClassic(req, res))
router.post('/login', (req, res) => authenticationControllers.login(req, res))
router.post('/signup/custom', (req, res) => authenticationControllers.signupCustom(req, res))
export default router