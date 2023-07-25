import { model, Schema } from "mongoose"

const SellerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    CINUrl: {
        type: string,
        require: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items',
    }]

})

const SellerModel = new model('Sellers', SellerSchema)
export default SellerModel