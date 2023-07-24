import mongoose, { Mongoose } from "mongoose" 

const itemsSchema = new mongoose.Schema({
    nameItem:{
        type:String,
        required:true
    },
    priceItem:{
        type:Number,
        required:true
    },
    numberItem:{
        type:Number,
        required:true
    },
    UnderClass:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"underClasses",
        required:true
    }
})
const items = mongoose.model('items',itemsSchema)
module.exports = {items} 