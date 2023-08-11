import categoryModel from "../models/category.model.js"
import CategoryService from "../services/category.service.js"
import ResponseFormat from "../utils/response.js"
const categoryService=new CategoryService()
export default class CategoryController{
    async addCategory(req,res){
        let {name}=req.body
        if(name){
           try {
            name=name.toLowerCase()
            const data=await categoryService.addCategory(name)
            res.status(data.code).send(data)
           } catch (error) {
            res.status(500).json({error:error.message})
           }
        }else{res.status(401).send("nom de la catégorie requis!")}
    }
    async getAllCategories(req,res){
        try {
            const data=await categoryService.getAllCategories()
            res.send(data)
        } catch (error){ res.status(500).json({error:error.message})}
    }
    async getOneCategory(req,res){
    const{name}=req.query
    if (name){
        try {
            const data=await categoryService.getOneCategory((name.toLowerCase()))
            res.send(data)
        } catch (error){res.status(500).json({error:error.message})}
    } 
    }
    async editCategory(req, res) {
        const { name } = req.query
        const { newName } = req.body
    
        if (name && newName) {
          try {
            const updatedCategory = await categoryService.editCategory(name, newName);
            res.send(updatedCategory)
          } catch (error) {
            res.status(500).send(new ResponseFormat(500,"FAILURE",{error},"Erreur"))
          }
        } else {
          res.status(400).send(new ResponseFormat(400,"FAILURE",{},"le nom et le nouveau nom de la catégorie sont requis!"))
        }
      }
    async deleteCategory(req,res){
      const {name}=req.query
      if(name){
        try{        
          const data=await categoryService.deleteCategory(name)
          if (data){res.status(200).send(data)}
          else{return new ResponseFormat(404,"FAILURE",{},"Catégorie non trouvée!")}
        }catch(error){
        res.status(500).send(new ResponseFormat(500,"FAILURE",{error},`Erreur du serveur!`))}
      }else{return new ResponseFormat(401,"FAILURE",{},`Entrer le nom de la catégorie à supprimer!`)}
    }
}

