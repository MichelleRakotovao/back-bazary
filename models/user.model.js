import { model, Schema } from "mongoose"

const UserSchema = new Schema({
    fullname: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: false
    },
    pictureUrl: {
        type: String,
        default: 'https://picsum.photos/200/300'
    },
    authenticationType: {
        type: {
            providerName: String,
            uuid: String
        }
    },
    sellerID: {
        type: Schema.Types.ObjectId,
        ref: 'Sellers',
        require: false
    },
    phoneNumber: {
        type: String,
        require: false
    },
    phoneCode: {
        type: String,
        require: false
    },
    isPhoneVerified: {
        type: Boolean,
        require: false
    }

})

const UserModel = new model('Users', UserSchema)

export default UserModel