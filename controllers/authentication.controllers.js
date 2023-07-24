import AuthenticationService from "../services/authentication.service.js"
import ResponseFormat from "../utils/response.js"
import deleteSpace from "../utils/deleteSpace.js"
import deleteSpacePhone from "../utils/deleteSpacePhone.js"

class AuthenticationController {
    static signupClassic = async (req, res) => {
        let { fullname, password, phoneNumber } = req.body
        if (fullname && password && phoneNumber && fullname.length > 10 && (deleteSpace(password)).length > 6 &&(deleteSpacePhone(phoneNumber)).length > 9){
            const data = await AuthenticationService.signupClassic(fullname, password, phoneNumber)
            res.status(data.code).send(data)
        } else res.status(401).send(new ResponseFormat(401, 'FAILURE', {}, 'Veuillez verifier les champs "fullname, password, phoneNumber" '))
    }
    static async login(req,res){
        let {phoneNumber,password}=req.body
        if(phoneNumber&& password){
           try {
            const data=await AuthenticationService.login(password,phoneNumber)
             return res.status(data.code).send(data)
        }catch(error){
            console.error(`Erreur lors de l'authentification ${error}`)
            return res.status(500).send(new ResponseFormat(500,"FAILURE",{},`Erreur du serveur`))
        }
        }
        return res.status(401).send(new ResponseFormat(401,"FAILURE",{},`Numéro de téléphone et mot de passe requis`))
       
    }

}
export default AuthenticationController
