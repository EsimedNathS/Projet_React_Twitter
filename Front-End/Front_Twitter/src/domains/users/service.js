import { createNotificationService } from "../notifications/service";
import { getUser, followUser, deleteFollow, getFollow, getFollowId, getFollower } from "./api";

export async function followUserService(userId, followingId) {
    const resultFollow = await followUser(userId, followingId);
    await createNotificationService(followingId, userId, "follow");
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
        const followingIds = follows.map(follow => follow.followingId);
        const followers = await getFollower(userId);
        const followersIds = followers.map(follow => follow.followingId);

        const followingData = await Promise.all(followingIds.map(id => getUser(id)));
        const followersData = await Promise.all(followersIds.map(id => getUser(id)));

        // Vérification si `mainUserId` suit `userId`
        const isMainUserFollowing = mainUserId 
            ? followers.some(follower => follower.userId === mainUserId)
            : false;

        return {
            followersCount: followers.length,
            followersData: followersData,
            followsCount: follows.length,
            followsData: followingData,
            isMainUserFollowing,
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