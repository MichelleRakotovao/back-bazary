import { Router } from "express"
import categoryController from "../controllers/category.controllers.js"
const router=Router()
const CategoryController=new categoryController()
router.post('/addCategory',(req,res)=>CategoryController.addCategory(req,res))
router.get('/getAllCategories',(req,res)=>CategoryController.getAllCategories(req,res))
router.get('/getOneCategory',(req,res)=>CategoryController.getOneCategory(req,res))
router.put('/editCategory',(req,res)=>CategoryController.editCategory(req,res))
export default router
