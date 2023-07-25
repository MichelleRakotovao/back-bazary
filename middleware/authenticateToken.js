import Jwt from 'jsonwebtoken'
import ResponseFormat from '../utils/response.js'

const authenticateToken = async (req, res, next) => {
    const SECRET = process.env.SECRET || '0000'
    const { authorization } = req.headers
    if (authorization) {
        let token = authorization
        if (authorization.includes("Bearer")) token = authorization.split(" ")[1]
        try {
            Jwt.verify(token, SECRET)
            next()
        } catch (error) { res.status(403).send(new ResponseFormat(403, 'FAILURE', {}, `Le token JWT que vous avez envoyé n'est plus valide, veuillez vous reconnecter`)) }
    } else res.status(403).send(new ResponseFormat(403, 'FAILURE', {}, `Vous devez vous connecter pour pouvoir utiliser cette fonctionnalité`))
}

export default authenticateToken