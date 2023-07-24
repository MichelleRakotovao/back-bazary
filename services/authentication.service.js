import UserModel from "../models/user.model.js"
import hash from "../utils/hash.js"
import randomCode from "../utils/randomCode.js"
import ResponseFormat from "../utils/response.js"
import { isPhone} from "../utils/validator.js"
import deleteSpace from "../utils/deleteSpace.js"
import deleteSpacePhone from "../utils/deleteSpacePhone.js"
import  JsonWebToken  from "jsonwebtoken"
import compare from "../utils/compare.js"
class AuthenticationService {

    static signupClassic = async (fullname, password, phoneNumber) => {
        if (isPhone(phoneNumber)) {
            password = hash(deleteSpace(password))
            fullname=deleteSpace(fullname)
            phoneNumber=deleteSpacePhone(phoneNumber)
            const phoneCode = randomCode()
            const existTest = await UserModel.findOne({ phoneNumber })
            if (!existTest) {
                const newUser = new UserModel(
                    {
                        fullname,
                        password,
                        phoneNumber,
                        authenticationType: {
                            providerName: 'classic',
                            uuid: phoneNumber
                        },
                        phoneCode
                    })
                newUser.save()
                return new ResponseFormat(200, 'SUCCESS', { authentication: fullname }, 'Votre compte a été créé')
            } else return new ResponseFormat(403, 'FAILURE', {}, 'Ce numéro de téléphone est déjà utilisé')
        } else return new ResponseFormat(401, 'FAILURE', {}, 'Veuillez fournir un numéro valide')
       
    }
    static login=async(password,phoneNumber)=>{
        password=hash(deleteSpace(password))
        let user=await UserModel.findOne({phoneNumber:phoneNumber})
        if(!user) return new ResponseFormat(404,"FAILURE",{},`Utilisateur introuvable`)
        const passwordMatch=compare(password,user.password)
        if (!passwordMatch) return new ResponseFormat(401,"FAILURE",{},`Mot de passe incorrect`)
        return new ResponseFormat(200,"SUCCESS",{phoneNumber},`Authentification réussie`)
    }
}
export default AuthenticationService