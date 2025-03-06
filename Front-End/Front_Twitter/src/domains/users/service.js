import { getUser, followUser, unfollowUser, getFollow, getFollower } from "./api";


export async function followUserService(userId, followingId) {
    const resultFollow = await followUser(userId, followingId);
    return resultFollow;
}

export async function unfollowUserService(userId, followingId) {
    const resultUnfollow = await unfollowUser(userId, followingId);
    return resultUnfollow;
}

export async function getFollowService(userId, mainUserId = null) {
    try {
        const follows = await getFollow(userId);
        const followers = await getFollower(userId);
        const followerIds = follows.map(follow => follow.followingId); // Liste des follows

        console.log(follows);
        console.log(followers);
        console.log(userId);
        console.log(mainUserId);

        // Récupération des infos des utilisateurs qui suivent `userId`
        const followData = await Promise.all(followerIds.map(id => getUser(id)));

        // Vérification si `mainUserId` suit `userId`
        const isMainUserFollowing = mainUserId 
            ? followers.some(follower => follower.followerId === mainUserId)
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