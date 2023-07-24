import { Router } from "express"
import authenticationControllers from "../controllers/authentication.controllers.js"
import AuthenticationService from "../services/authentication.service.js"
const router = Router()

router.post('/signup/classic', (req, res) => authenticationControllers.signupClassic(req, res))
router.post('/signin',(req,res)=>authenticationControllers.login(req,res))
export default router