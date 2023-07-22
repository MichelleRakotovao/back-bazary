import AuthenticationService from "../services/authentication.service.js"
import ResponseFormat from "../utils/response.js"
import deleteSpace from "../utils/deleteSpace.js"
class AuthenticationController {
    static signupClassic = async (req, res) => {
        let { fullname, password, phoneNumber } = req.body
        if (fullname && password && phoneNumber && fullname.length > 10 && (deleteSpace(password)).length > 6 && phoneNumber.length > 9) {
            const data = await AuthenticationService.signupClassic(fullname, password, phoneNumber)
            res.status(data.code).send(data)
        } else res.status(401).send(new ResponseFormat(401, 'FAILURE', {}, 'Veuillez verifier les champs "fullname, password, phoneNumber" '))
    }
}
export default AuthenticationController
