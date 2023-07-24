import { Router } from "express"

const router = Router()
import { addClass, displayClass, displayClassOne, editClass, deleteClass } from '../controllers/classController.js'
router.post('/', addClass)
router.get('/', displayClass)
router.get('/one', displayClassOne)
router.put('/classes/:id', editClass)
router.delete('/class/:id', deleteClass)
export default router