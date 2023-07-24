const {model} = require("mongoose")
const classes = new model(
    "bazary",{
            nameClass:{
                type:String,
                required:true
            },
            numberClass:{
                type:Number,
                required:true
            }   
    },"classes"
)
module.exports = {classes}