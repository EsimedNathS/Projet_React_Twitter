import { addZweez, supZweez, modifZweez, getZweezList, getZweezListUser, addLikeZweez, supLikeZweez } from "./api";

export async function getZweezListService() {
    const zweezList = await getZweezList();
    return zweezList;
}

export async function addZweezService(content, userId, username) {
    const zweezList = await addZweez(content, userId, username);
    return zweezList;
}

export async function supZweezService(zweezId) {
    const zweezList = await supZweez(zweezId);
    return zweezList;
}

export async function modifZweezService(zweezId, userId, username, newContent, time) {
    const zweezList = await modifZweez(zweezId, userId, username, newContent, time);
    return zweezList;
}

export async function getZweezListUserService(userId) {
    const zweezList = await getZweezListUser(userId);
    return zweezList;
}

export async function addLikeZweezService(userId, zweezId) {
    const responseLike = await addLikeZweez(userId, zweezId);
    return responseLike;
}

export async function supLikeZweezService(userId, zweezId) {
    const responseLike = await supLikeZweez(userId, zweezId);
    return responseLike;
}