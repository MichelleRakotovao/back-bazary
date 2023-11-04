import Jwt from 'jsonwebtoken'

export function generateToken(id) {
    const SECRET = process.env.SECRET || '0000'
    const token = Jwt.sign({ id }, SECRET, { expiresIn: '2d' })
    return token
}