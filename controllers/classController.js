const { classes } = require("../models/classModel");

const addClass = async (req, res) => {
    try {
        const { nameClass, numberClass } = req.body
        if (nameClass && numberClass) {
            const newClass = new classes({ nameClass, numberClass })
            await newClass.save()
            res.send(newClass)
        } else {res.status(401).send('Veuillez envoyer les données')}
    } catch (error) { res.status(500).json({ error: error.message })}
}

const displayClass = async(req,res)=>{
    try {
        const allClasses = await classes.find()
        res.send(allClasses)
    } catch (error) {res.status(500).json({ error: error.message })}
}

const displayClassOne = async(req,res)=>{
    const {id} = req.query
    res.send(await classes.findById(id))
}

const editClass = async(req,res)=>{
    try{
        const {id} = req.query;
        const data = await classes.findById(id)
        if(!data){
            res.status(404).send('categories non trouvé')
        }else {
            data.nameClass = req.body.nameClass
            data.numberClass = req.body.numberClass
            await data.save()
            res.send(data)
        }
    }catch(error){res.status(500).json({error:error.message})}
}

const deleteClass = async(req,res)=>{
    try{
        const {id} = req.query
        const data = await classes.findOneAndDelete({_id: id})
        if(!data){
            return res.status(404).send("Cette categorie est introubable")
        }
        console.log("Categorie supprimé: ",data)
        res.send(data.nameClass+" est supprimé")
    } catch(error){console.error('erreur lors de la suppréssion', error)}
    res.status(500).json({error:error.message})
} 

module.exports = { addClass,displayClass,displayClassOne,editClass,deleteClass };