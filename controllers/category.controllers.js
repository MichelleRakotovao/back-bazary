import CategoryService from "../services/category.service.js"
const categoryService=new CategoryService()
export default class CategoryController{
    async addCategory(req,res){
        let {name}=req.body
        if(name){
           try {
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
            const data=await categoryService.getOneCategory(name)
            res.send(data)
        } catch (error){res.status(500).json({error:error.message})}
    } 
    }
}
