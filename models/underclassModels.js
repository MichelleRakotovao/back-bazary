import mongoose from "mongoose"
const underClassesSchema = new mongoose.Schema({
    nameUnderClass: {
        type: String,
        required: true
    },
    Class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classes', 
        required: true
    }
})
const underClasses = mongoose.model('underClasses', underClassesSchema)
export default underClasses