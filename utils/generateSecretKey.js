function GenerateSecretkey(){
    const length=32()
    const randomBytes=crypto.randomBytes(32)
    const secretKey = randomBytes.toString('base64')
    return secretKey
    console.log(`generate secret key ${secretKey}`)
}