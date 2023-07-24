import  {CategoryModel} from "../models/category.model.js"
class CategoryController{
      addCategory = async (req, res) => {
        try {
            const { name, count } = req.body
            if (name && count) {
                const newCategory = new CategoryModel({ name, count })
                await newCategory.save()
                res.send(newCategory)
            } else {res.status(401).send('Veuillez envoyer les données')}
        } catch (error) { res.status(500).json({ error: error.message })}
    }
    
    displayCategory = async(req,res)=>{
        try {
            const allCategories = await CategoryModel.find()
            res.send(allCategories)
        } catch (error) {res.status(500).json({ error: error.message })}
    }
    
    displayOneCategory = async(req,res)=>{
        const {id} = req.query
        res.send(await CategoryModel.findById(id))
    }
    
    editCategory = async(req,res)=>{
        try{
            const {id} = req.query;
            const data = await CategoryModel.findById(id)
            if(!data){
                res.status(404).send('categories non trouvé')
            }else {
                data.name= req.body.name
                data.count= req.body.count
                await data.save()
                res.send(data)
            }
        }catch(error){res.status(500).json({error:error.message})}
    }
    
     deleteCategory = async(req,res)=>{
        try{
            const {id} = req.query
            const data = await CategoryModel.findOneAndDelete({_id: id})
            if(!data){
                return res.status(404).send("Cette categorie est introubable")
            }
            console.log("Categorie supprimé: ",data)
            res.send(data.name+" est supprimé")
        } catch(error){console.error('erreur lors de la suppréssion', error)}
        res.status(500).json({error:error.message})
    } 
}
export default CategoryController