import { signup, verifyToken } from "./api";
import { jwtDecode } from "jwt-decode";

export async function signupService(email, password, username) {
    const token = await signup(email, password, username);
}

export function getIdByToken(token){
    const userInfo = jwtDecode(token);
    return userInfo.sub;
}

export async function verifytokenService(token) {
    const userId = getIdByToken(token);
    const userData = await verifyToken(token, userId)
    return userData;
}



// TODO Mettre les vérifications ici