import hash from "../utils/hash.js"
import SellerModel from "../models/seller.model.js"
import randomCode from "../utils/randomCode.js"
import { isPhone } from "../utils/validator.js"
import deleteSpace from "../utils/deleteSpace.js"
import ResponseFormat from "../utils/response.js"
import { generateToken } from "../utils/generateToken.js"
import deleteAllSpaces from "../utils/deleteAllSpaces.js"

class AuthenticationService {

    static signupClassic = async (fullname, password, phoneNumber) => {
        if (isPhone(phoneNumber)) {
            password = hash(password)
            fullname = deleteSpace(fullname)
            phoneNumber = deleteAllSpaces(phoneNumber)
            const phoneCode = randomCode()
            const existTest = await SellerModel.findOne({ phoneNumber })
            if (!existTest) {
                const newSeller = new SellerModel(
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
                await newSeller.save()
                return new ResponseFormat(200, 'SUCCESS', { token: generateToken(newSeller.id, '') }, 'Votre compte a été créé')
            } else return new ResponseFormat(403, 'FAILURE', {}, 'Ce numéro de téléphone est déjà utilisé')
        } else return new ResponseFormat(401, 'FAILURE', {}, 'Veuillez fournir un numéro valide')
    }

    static signupCustom = async (fullname, uuid, authenticationProvider) => {
        fullname = deleteSpace(fullname)
        const existTest = await SellerModel.findOne({
            authenticationType: {
                providerName: authenticationProvider,
                uuid: uuid
            }
        })
        if (!existTest) {
            const newSeller = new SellerModel(
                {
                    fullname,
                    authenticationType: {
                        providerName: authenticationProvider,
                        uuid: uuid
                    },
                })
            await newSeller.save()
            return new ResponseFormat(200, 'SUCCESS', { token: generateToken(newSeller.id, '') }, 'Votre compte a été créé')
        } else return new ResponseFormat(403, 'FAILURE', {}, `Ce compte ${authenticationProvider} est déjà inscript sur Bazary`)
    }

    static login = async (password, phoneNumber) => {
        password = hash(password)
        let seller = await SellerModel.findOne({ phoneNumber, password })
        if (seller) return new ResponseFormat(200, "SUCCESS", { token: generateToken(seller.id) }, `Authentification réussie`)
        else return new ResponseFormat(404, "FAILURE", {}, `Utilisateur introuvable`)
    }

    static validatePhoneNumber = async (userId, validationCode) => {
        const user = await SellerModel.findById(userId)
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
        const seller = await SellerModel.findById(userId)
        if (seller) {
            if (seller.phoneNumber) {
                if (seller.isPhoneVerified) {
                    const confirmationCode = randomCode()
                    seller.phoneCode = confirmationCode
                    await user.save()
                    // manque le code pour envoyer le sms
                    return new ResponseFormat(200, 'SUCCESS', {}, `Vous avez reçu un code de confirmation pour reinitialiser votre mot de passe`)
                } else return new ResponseFormat(403, 'FAILURE', {}, `Vous n'avez pas encore validé votre numéro téléphone. Seul les comptes ayant un numéro de téléphone vérifié peuvent utiliser cette fonctionnalité`)
            } else return new ResponseFormat(403, 'FAILURE', {}, `Ce compte a été uniquement enregistré avec ${user.authenticationType.providerName}, donc il est impossible de récupérer son mot de passe. Seul les comptes ayant un numéro de téléphone vérifié peuvent utiliser cette fonctionnalité`)
        } else return new ResponseFormat(403, 'FAILURE', {}, `Cet utilisateur n'est pas inscrit dans Bazary`)
    }

    static resetPassword = async (userId, password, phoneCode) => {
        const seller = await SellerModel.findById(userId)
        if (seller) {
            if (seller.phoneNumber) {
                if (seller.isPhoneVerified) {
                    if (phoneCode == seller.phoneCode) {
                        password = hash(password)
                        seller.password = password
                        seller.phoneCode = '0000'
                        await seller.save()
                        const token = generateToken(user.id, user.sellerID)
                        return new ResponseFormat(200, 'SUCCESS', { token }, `Votre mot de passe a été reinitialisé`)
                    } else return new ResponseFormat(403, 'FAILURE', {}, `Le code de confirmation ne correspond pas`)
                } else return new ResponseFormat(403, 'FAILURE', {}, `Vous n'avez pas encore validé votre numéro téléphone. Seul les comptes ayant un numéro de téléphone vérifié peuvent utiliser cette fonctionnalité`)
            } else return new ResponseFormat(403, 'FAILURE', {}, `Ce compte a été uniquement enregistré avec ${seller.authenticationType.providerName}, donc il est impossible de récupérer son mot de passe. Seul les comptes ayant un numéro de téléphone vérifié peuvent utiliser cette fonctionnalité`)
        } else return new ResponseFormat(403, 'FAILURE', {}, `Cet utilisateur n'est pas inscrit dans Bazary`)
    }
}
export default AuthenticationService