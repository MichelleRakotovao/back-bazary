import crypto from 'crypto'

export default (toHash) => {
    const hashed = crypto.createHash('sha256')
    hashed.update(toHash)
    return hashed.digest('hex')
}