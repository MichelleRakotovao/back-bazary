import { Schema, model } from "mongoose"

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picturesUrls: [{
        type: String
    }],
    count: {
        type: Number,
        required: true
    },
    type: {
        type: {
            category: String,
            subCategory: String,
        }
    },
    size: Number,
    color: String,
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Orders',
    }],
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Sellers',
    }
})
const ItemModel = new model('Items', ItemSchema)
export default ItemModel
