import { createNotification } from "../notifications/api";
import { getUser, followUser, deleteFollow, getFollow, getFollowId, getFollower } from "./api";

export async function followUserService(userId, followingId) {
    const resultFollow = await followUser(userId, followingId);
    await createNotification(zweezOwnerId, userId, "follow");
    return resultFollow;
}

export async function unfollowUserService(userId, followingId) {
    try {
        const followId = await getFollowId(userId, followingId);

        if (!followId) {
            return { success: false, message: "Follow non trouvé" };
        }

        return await deleteFollow(followId);
    } catch (error) {
        return { success: false, message: "Erreur serveur" };
    }
}

export async function getFollowService(userId, mainUserId = null) {
    try {
        const follows = await getFollow(userId);
        const followers = await getFollower(userId);
        const followerIds = follows.map(follow => follow.followingId); // Liste des follows

        // Récupération des infos des utilisateurs qui suivent `userId`
        const followData = await Promise.all(followerIds.map(id => getUser(id)));

        // Vérification si `mainUserId` suit `userId`
        const isMainUserFollowing = mainUserId 
            ? followers.some(follower => follower.userId === mainUserId)
            : false;

        return {
            followersCount: followers.length,
            followsCount: follows.length,
            followsData: followData, // Infos des utilisateurs qui suivent `userId`
            isMainUserFollowing, // 🔹 Indique si mainUserId suit userId
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des followers:", error);
        throw error;
    }
}



export async function getUserService(userId) {
    const userData = await getUser(userId);
    return userData;
}