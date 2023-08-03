import { model,Schema} from "mongoose"
const categorySchema=new Schema({
    name:{
        type:String,
        required:true
    }
})
const categoryModel=new model("Categories",categorySchema)
export default categoryModel