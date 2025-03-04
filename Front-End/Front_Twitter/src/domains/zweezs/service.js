import { getZweezList } from "./api";


export async function getZweezUserService(userId) {
    const token = await signup(email, password);
}

export async function getZweezListService(token) {
    const zweezList = await getZweezList(token);
    console.log(zweezList);
}