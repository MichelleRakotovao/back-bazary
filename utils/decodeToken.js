import jwtDecode from "jwt-decode";

const decodeToken = (token) => {
    try {
        if (token && token.includes("Bearer ")) {
            const authorization = token.split(" ")[1];
            const payload = jwtDecode(authorization);
            return { authorization, payload };
        } else {
            throw new Error("Token is missing or has an invalid format.");
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        return null; // Vous pouvez renvoyer null ou un objet vide pour indiquer une erreur de token.
    }
}

export default decodeToken;
