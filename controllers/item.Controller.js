import { items } from "../models/item.model.js"
const addItem = async(req,res)=>{
    try{
        const {name, price,count,subCategory} = req.body
        if(name&& price&& count && subCategory){
            const newItem = new items({name,price,count,subCategory})
            await newItem.save()
            res.send(newItem)
        }else res.status(401).send('Veuillez envoyer les données nécessaire')
    }catch(error){ res.status(500).json({ error }) }
}

const displayItem= async(req,res)=>{
    try {
        const allItems = await items.find()
        res.send(allItems)
    } catch (error) {res.status(500).json({ error: error.message })}
} 

const displayItemOne = async(req,res)=>{
    const {id} = req.query
    res.send(await items.findById(id))
}

const editItem = async(req,res)=>{
    try{
        const {id} = req.query;
        const data = await items.findById(id)
        if(!data){
            res.status(404).send('Article non trouvé')
        }else {
            data.name= req.body.name
            data.count = req.body.count
            data.price = req.body.price
            data.subCategory = req.body.subCategory
            await data.save()
            res.send(data)
        }
    }catch(error){res.status(500).json({error:error.message})}
}

const deleteItem = async(req,res)=>{
    try{
        const {id} = req.query
        const data = await items.findOneAndDelete({_id: id})
        if(!data){
            return res.status(404).send("Cette categorie est introubable")
        }
        console.log("Article supprimé: ",data)
        res.send(data.name+" est supprimé")
    }catch(error){console.error('erreur lors de la suppréssion', error)}
    res.status(500).json({error:error.message})
}
module.exports = {addItem,displayItem,displayItemOne,editItem,deleteItem}