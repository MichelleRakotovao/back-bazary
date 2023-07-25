import { Router } from "express"
import munterConfig from '../config/multer.js'
import UploadController from '../controllers/staticFile.controllers.js'
const router = Router()

router.post("/upload", munterConfig.array("images", Number.POSITIVE_INFINITY), (req, res) => UploadController(req, res))
export default router