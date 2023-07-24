import { Schema, model } from "mongoose"

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: "SubCategories"
    }
})
const CategoryModel = new model('Categories', CategorySchema)
export default CategoryModel
