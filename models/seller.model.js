import { model, Schema } from "mongoose"

const SellerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    CINUrl: {
        type: String,
        require: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Items',
    }]

})

const SellerModel = new model('Sellers', SellerSchema)
export default SellerModel