import { Router } from "express"
import categoryController from "../controllers/category.controllers.js"
const router=Router()
const CategoryController=new categoryController()
router.post('/addCategory',(req,res)=>CategoryController.addCategory(req,res))
router.get('/getAllCategories',(req,res)=>CategoryController.getAllCategories(req,res))
router.get('/getOneCategory',(req,res)=>CategoryController.getOneCategory(req,res))
export default router
