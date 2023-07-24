import { Schema, model } from "mongoose"
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    }
})
SubCategoryModel = new model('SubCategories', subCategorySchema)
export default SubCategoryModel