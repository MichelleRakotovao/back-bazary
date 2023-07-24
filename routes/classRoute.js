const express = require('express')
const router = express.Router()
import { addClass,displayClass,displayClassOne,editClass,deleteClass } from '../controllers/classController.js'
router.post('/',addClass)
router.get('/',displayClass)
router.get('/one',displayClassOne)
router.put('/classes/:id',editClass)
router.delete('/class/:id',deleteClass)
module.exports = router