const express = require('express')
const router = express.Router()
const {addClass,displayClass,displayClassOne,editClass,deleteClass}=require("../controllers/classController")
router.post('/',addClass)
router.get('/',displayClass)
router.get('/one',displayClassOne)
router.put('/classes/:id',editClass)
router.delete('/class/:id',deleteClass)
module.exports = router