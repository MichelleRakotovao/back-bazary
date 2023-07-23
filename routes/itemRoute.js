const express = require('express')
const routes = express.Router()
const {addItem,displayItem,displayItemOne,editItem,deleteItem} = require("../controllers/itemsController")

routes.post('/',addItem)
routes.get('/',displayItem)
routes.get('/one',displayItemOne)
routes.put('/item',editItem)
route.delete('/delete',deleteItem)

module.exports = {routes}