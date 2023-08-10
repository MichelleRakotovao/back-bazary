import { model, Schema } from "mongoose"

const SellerSchema = new Schema({
    fullname: {
        type: String,
    },

    password: {
        type: String,
    },
    CINUrl: {
        type: String,
        default: 'https://picsum.photos/200/300'
    },
    authenticationType: {
        type: {
            providerName: String,
            uuid: String
        }
    },
    phoneNumber: {
        type: String,
        require: false,
        unique: true
    },
    phoneCode: {
        type: String,
        require: false
    },
    isPhoneVerified: {
        type: Boolean,
        require: false
    },
    items:{
        type:Schema.Types.ObjectId,
        ref:'Items'
    }

})

const SellerModel = new model('Sellers',SellerSchema)
export default SellerModel