import { Schema, model } from "mongoose"
const subCategorySchema = new Schema({
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
const SubCategoryModel = model('SubCategories', subCategorySchema)
export default SubCategoryModel