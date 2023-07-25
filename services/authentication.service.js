import hash from "../utils/hash.js"
import UserModel from "../models/user.model.js"
import randomCode from "../utils/randomCode.js"
import { isPhone } from "../utils/validator.js"
import deleteSpace from "../utils/deleteSpace.js"
import ResponseFormat from "../utils/response.js"
import { generateToken } from "../utils/generateToken.js"
import deleteSpacePhone from "../utils/deleteSpacePhone.js"

class AuthenticationService {

    static signupClassic = async (fullname, password, phoneNumber) => {
        if (isPhone(phoneNumber)) {
            password = hash(password)
            fullname = deleteSpace(fullname)
            phoneNumber = deleteSpacePhone(phoneNumber)
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
                await newUser.save()
                return new ResponseFormat(200, 'SUCCESS', { token: generateToken(newUser.id, '') }, 'Votre compte a été créé')
            } else return new ResponseFormat(403, 'FAILURE', {}, 'Ce numéro de téléphone est déjà utilisé')
        } else return new ResponseFormat(401, 'FAILURE', {}, 'Veuillez fournir un numéro valide')
    }

    static signupCustom = async (fullname, uuid, authenticationProvider) => {
        fullname = deleteSpace(fullname)
        const existTest = await UserModel.findOne({
            authenticationType: {
                providerName: authenticationProvider,
                uuid: uuid
            }
        })
        if (!existTest) {
            const newUser = new UserModel(
                {
                    fullname,
                    authenticationType: {
                        providerName: authenticationProvider,
                        uuid: uuid
                    },
                })
            await newUser.save()
            return new ResponseFormat(200, 'SUCCESS', { token: generateToken(newUser.id, '') }, 'Votre compte a été créé')
        } else return new ResponseFormat(403, 'FAILURE', {}, `Ce compte ${authenticationProvider} est déjà inscript sur Bazary`)
    }

    static login = async (password, phoneNumber) => {
        password = hash(password)
        let user = await UserModel.findOne({ phoneNumber, password })
        if (user) return new ResponseFormat(200, "SUCCESS", { token: generateToken(user.id, user.sellerID) }, `Authentification réussie`)
        else return new ResponseFormat(404, "FAILURE", {}, `Utilisateur introuvable`)
    }

    static validatePhoneNumber = async (userId, validationCode) => {
        const user = await UserModel.findById(userId)
        if (user) {
            if (user.phoneNumber) {
                if (user.phoneCode == validationCode) {
                    user.validationCode = '000000'
                    isPhoneVerified = true
                    await user.save()
                    return new ResponseFormat(200, 'SUCCESS', {}, `Votre numero de téléphone est désormais vérifié`)
                } else return new ResponseFormat(403, 'FAILURE', {}, `Ce code ne correspond pas au code de validation que nous vous avons envoyé`)
            } else return new ResponseFormat(403, 'FAILURE', {}, `Vous n'avez pas de numéro téléphone à verifier`)
        } else return new ResponseFormat(403, 'FAILURE', {}, `Cet utilisateur n'est pas inscrit dans Bazary`)
    }

    static forgotPassword = async (userId) => {
        const user = await UserModel.findById(userId)
        if (user) {
            if (user.phoneNumber) {
                if (user.isPhoneVerified) {
                    const confirmationCode = randomCode()
                    user.phoneCode = confirmationCode
                    await user.save()
                    // manque le code pour envoyer le sms
                    return new ResponseFormat(200, 'SUCCESS', {}, `Vous avez reçu un code de confirmation pour reinitialiser votre mot de passe`)
                } else return new ResponseFormat(403, 'FAILURE', {}, `Vous n'avez pas encore validé votre numéro téléphone. Seul les comptes ayant un numéro de téléphone vérifié peuvent utiliser cette fonctionnalité`)
            } else return new ResponseFormat(403, 'FAILURE', {}, `Ce compte a été uniquement enregistré avec ${user.authenticationType.providerName}, donc il est impossible de récupérer son mot de passe. Seul les comptes ayant un numéro de téléphone vérifié peuvent utiliser cette fonctionnalité`)
        } else return new ResponseFormat(403, 'FAILURE', {}, `Cet utilisateur n'est pas inscrit dans Bazary`)
    }

    static resetPassword = async (userId, password, phoneCode) => {
        const user = await UserModel.findById(userId)
        if (user) {
            if (user.phoneNumber) {
                if (user.isPhoneVerified) {
                    if (phoneCode == user.phoneCode) {
                        password = hash(password)
                        user.password = password
                        user.phoneCode = '0000'
                        await user.save()
                        const token = generateToken(user.id, user.sellerID)
                        return new ResponseFormat(200, 'SUCCESS', { token }, `Votre mot de passe a été reinitialisé`)
                    } else return new ResponseFormat(403, 'FAILURE', {}, `Le code de confirmation ne correspond pas`)
                } else return new ResponseFormat(403, 'FAILURE', {}, `Vous n'avez pas encore validé votre numéro téléphone. Seul les comptes ayant un numéro de téléphone vérifié peuvent utiliser cette fonctionnalité`)
            } else return new ResponseFormat(403, 'FAILURE', {}, `Ce compte a été uniquement enregistré avec ${user.authenticationType.providerName}, donc il est impossible de récupérer son mot de passe. Seul les comptes ayant un numéro de téléphone vérifié peuvent utiliser cette fonctionnalité`)
        } else return new ResponseFormat(403, 'FAILURE', {}, `Cet utilisateur n'est pas inscrit dans Bazary`)
    }
}
export default AuthenticationService