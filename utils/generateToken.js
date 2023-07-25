import Jwt from 'jsonwebtoken'

export function generateToken(id, sellerID) {
    const SECRET = process.env.SECRET || '0000'
    const token = Jwt.sign({ id, sellerID }, SECRET, { expiresIn: '100000m' })
    return token
}