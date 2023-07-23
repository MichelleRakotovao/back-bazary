const express = require("express")

const route = express.Router()

const {addUnderClass,displayUnderClass,displayUnderClassOne,editUnderClass,deleteUnderClass}=require("../controllers/underclassController")

route.post('/',addUnderClass)
route.get('/all',displayUnderClass)
route.get('/one',displayUnderClassOne)
route.put('/under',editUnderClass)
route.delete('/delete',deleteUnderClass)

module.exports=route