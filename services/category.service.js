import CategoryModel from "../models/category.model.js"
import ResponseFormat from "../utils/response.js"
class CategoryService{
    async addCategory(name){
    const newCategory=await new CategoryModel({name})
    await newCategory.save()
    return new ResponseFormat(200,"SUCCESS",{name},`Catégorie créée avec succès!`)
    }
    async getAllCategories(){
        let allCategories=await CategoryModel.find()
        console.log(allCategories)
        return allCategories
    }
    async getOneCategory(name){
        const category=await CategoryModel.findOne({name})
        return category
    }
}
export default CategoryService