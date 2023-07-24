import { Schema, model } from "mongoose"

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})
export default CategoryModel = new model('Categories', CategorySchema)
