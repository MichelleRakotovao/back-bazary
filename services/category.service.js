import CategoryModel from "../models/category.model.js"
import ResponseFormat from "../utils/response.js"
class CategoryService {
  async addCategory(name) {
    const cat = await CategoryModel.findOne({ name })
    if (!cat) {
      const newCategory = await new CategoryModel({ name })
      await newCategory.save()
      return new ResponseFormat(200, "SUCCESS", { name }, `Catégorie créée avec succès!`)
    } else { return new ResponseFormat(401, "FAILURE", {}, "Cette catégorie existe déja!") }
  }
  async getAllCategories() {
    let allCategories = await CategoryModel.find()
    console.log(allCategories)
    return allCategories
  }
  async getOneCategory(name) {
    const category = await CategoryModel.findOne({ name })
    return category
  }
  async editCategory(categoryName, newName) {
    try {
      const updatedCategory = await CategoryModel.findOneAndUpdate(
        { name: categoryName },
        { name: newName },
        { new: true }
      )

      if (!updatedCategory) {
        return new ResponseFormat(404, "FAILURE", {}, `Catégorie non trouvée`)
      }

      return new ResponseFormat(200, "SUCCESS", updatedCategory, "Catégorie mise à jour avec succès!")
    } catch (error) {
      return new ResponseFormat(500, "FAILURE", { error }, "Erreur lors de la mise à jour!")
    }
  }
  async deleteCategory(categoryName) {
    try {
      const data = await CategoryModel.findOneAndDelete({ name: categoryName })
      if (!data) { return new ResponseFormat(404, "FAILURE", { categoryName }, `Cette catégorie n'existe pas!`) }
      return new ResponseFormat(200, "SUCCESS", { categoryName }, `Catégorie supprimée avec succès!`)
    } catch (error) { return new ResponseFormat(500, "FAILURE", { error }, "Erreur lors de la suppression de la catégorie!") }
  }
}

export default CategoryService