const decodeToken = (token) => {
    if (token.includes("Bearer")) token = authorization.split(" ")[1]
    const payload = jwt_decode(token, { header: true })
    return payload
}

export default decodeToken 