import { model, Schema } from "mongoose"

const SellerSchema = new Schema({
    CINUrl: {
        type: string,
        require: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items',
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
    }],
})

const SellerModel = new model('Sellers', SellerSchema)
export default SellerModel