import ResponseFormat from "../utils/response.js"
import deleteSpace from "../utils/deleteSpace.js"
import deleteSpace from "../utils/deleteSpace.js"
import deleteSpacePhone from "../utils/deleteSpacePhone.js"
import AuthenticationService from "../services/authentication.service.js"

class AuthenticationController {

    static signupClassic = async (req, res) => {
        let { fullname, password, phoneNumber } = req.body
        fullname = deleteSpace(fullname)
        password = deleteSpace(password)
        phoneNumber = deleteSpacePhone(phoneNumber)
        if (fullname && password && phoneNumber) {
            const data = await AuthenticationService.signupClassic(fullname, password, phoneNumber)
            res.status(data.code).send(data)
        } else res.status(401).send(new ResponseFormat(401, 'FAILURE', {}, 'Veuillez verifier les champs "fullname, password, phoneNumber" '))
    }

    static signupCustom = async (req, res) => {
        let { fullname, uuid, authenticationProvider } = req.body
        fullname = deleteSpace(fullname)
        if (fullname && uuid && authenticationProvider) {
            const data = await AuthenticationService.signupCustom(fullname, uuid, authenticationProvider)
            res.status(data.code).send(data)
        } else return res.status(401).send(new ResponseFormat(401, "FAILURE", {}, `fullname, uuid, authenticationProvider requis`))
    }

    static async login(req, res) {
        let { phoneNumber, password } = req.body
        if (phoneNumber && password) {
            const data = await AuthenticationService.login(password, phoneNumber)
            return res.status(data.code).send(data)
        }
        else return res.status(401).send(new ResponseFormat(401, "FAILURE", {}, `Numéro de téléphone et mot de passe requis`))
    }

    static async validatephoneNumber(req, res) {
        let { userId, validationCode } = req.body
        if (userId && validationCode) {
            const data = await AuthenticationService.validatephoneNumber(userId, validationCode)
            return res.status(data.code).send(data)
        }
        else return res.status(401).send(new ResponseFormat(401, "FAILURE", {}, ` userId, validationCode requis`))
    }
    static async forgotPassword(req, res) {
        let { userId } = req.body
        if (userId) {
            const data = await AuthenticationService.forgotPassword(userId)
            return res.status(data.code).send(data)
        }
        else return res.status(401).send(new ResponseFormat(401, "FAILURE", {}, ` userId requis`))
    }
    static async resetPassword(req, res) {
        let { userId, password, phoneCode } = req.body
        if (userId && password && phoneCode) {
            const data = await AuthenticationService.resetPassword(userId, password, phoneCode)
            return res.status(data.code).send(data)
        }
        else return res.status(401).send(new ResponseFormat(401, "FAILURE", {}, ` userId, password, phoneCode requis`))
    }

}
export default AuthenticationController
