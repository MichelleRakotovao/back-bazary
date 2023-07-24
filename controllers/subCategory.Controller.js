import { SubCategoryModel } from "../models/subCategory.model.js"
const addSubCategory= async (req,res)=>{
    try{
        const {name,category}= req.body
        if(name && category){
            const newSubCategory = new SubCategoryModel({name,category})
            await newSubCategory.save()
            res.send(newSubCategory)
        }else{res.status(401).send('Completez les données')}
    }catch(error){res.status(500).json({error:error.message})}
}

const displaySubCategory = async(req,res)=>{
    try{
        const allSubCategories = await SubCategoryModel.find()
        res.send(allSubCategories)
    }catch(error){res.status(500).json({error: error.message})}
}

const displayOneSubCategory = async(req,res)=>{
    const {id} = req.query
    res.send(await SubCategoryModel.findById(id))
}

const editSubCategory = async(req,res)=>{
    try{
        const {id} = req.params;
        const data = await SubCategoryModel.findById(id)
        if(!data){
            res.status(404).send('Sous categorie non trouvé')}
        else{
            data.name= req.body.name
            await data.save()
            res.send(data)
        }
    }catch(error){res.status(500).json({error:error.message})}
}

const deleteSubCategory=async(req,res)=>{
    try{
        const {id} = req.query
        const data = await SubCategoryModel.findByIdAndDelete({_id: id})
        if(!data){
            return res.status(404).send('Sous catégories non retrouvé')
        }
        console.log("sous ategorie supprimé : ",data)
        res.send(data.name+ 'est supprimé')
    }catch(error){console.error('Erreur lors da la suppression du sous catégorie : ',error)}
    res.status(500).json({error:error.message})   
}

export default {addSubCategory,displaySubCategory,editSubCategory,deleteSubCategory,displayOneSubCategory}