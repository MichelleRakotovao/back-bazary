const decodeToken = (token) => {
    if (token.includes("Bearer")) {
        const authorization = token.split(" ")[1];
        const payload = jwt_decode(token, { header: true });
        return { authorization, payload };
    }
}
export default decodeToken
