const {underClasses} = require("../models/underclassModels")

const addUnderClass= async (req,res)=>{
    try{
        const {nameUnderClass,Class}= req.body
        if(nameUnderClass && Class){
            const newUnderClass = new underClasses({nameUnderClass,Class})
            await newUnderClass.save()
            res.send(newUnderClass)
        }else{res.status(401).send('Completez les données')}
    }catch(error){res.status(500).json({error:error.message})}
}

const displayUnderClass = async(req,res)=>{
    try{
        const allunderClasses = await underClasses.find()
        res.send(allunderClasses)
    }catch(error){res.status(500).json({error: error.message})}
}

const displayUnderClassOne = async(req,res)=>{
    const {id} = req.query
    res.send(await underClasses.findById(id))
}

const editUnderClass = async(req,res)=>{
    try{
        const {id} = req.params;
        const data = await underClasses.findById(id)
        if(!data){
            res.status(404).send('Sous categorie non trouvé')}
        else{
            data.nameUnderClass = req.body.nameUnderClass
            await data.save()
            res.send(data)
        }
    }catch(error){res.status(500).json({error:error.message})}
}

const deleteUnderClass=async(req,res)=>{
    try{
        const {id} = req.query
        const data = await underClasses.findByIdAndDelete({_id: id})
        if(!data){
            return res.status(404).send('Sous catégories non retrouver')
        }
        console.log("sous ategorie supprimé : ",data)
        res.send(data.nameUnderClass+ 'est supprimé')
    }catch(error){console.error('Erreur lors da la suppression du sous catégorie : ',error)}
    res.status(500).json({error:error.message})   
}



module.exports ={addUnderClass,displayUnderClass,displayUnderClassOne,editUnderClass,deleteUnderClass}