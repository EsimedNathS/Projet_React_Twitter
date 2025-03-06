import axios from 'axios'
import store from '../../app/store';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { Authorization: `Bearer ${store.getState().authentification.token}` }
});

export async function getUser(userId) {
    const response = await axiosInstance.get(`users?id=${userId}`);
    return response.data;
}

export async function followUser(userId, followingId) {
    try {
        const response = await axiosInstance.post(
            `/follows`,
            { userId, followingId }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getFollow(userId) {
    try {
        const response = await axiosInstance.get(`follows?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des followers:", error);
        throw error;
    }
}

export async function getFollower(userId) {
    try {
        const response = await axiosInstance.get(`follows?followingId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des followers:", error);
        throw error;
    }
}

export async function unfollowUser(userId, followingId) {
    try {
        const response = await axiosInstance.get(`follows?userId=${userId}&followingId=${followingId}`);

        if (response.data.length === 0) {
            return { success: false, message: "Like non trouvé" };
        }
        const followId = response.data[0].id;

        await axiosInstance.delete(`follows/${followId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return { success: true, message: "Follow supprimé" };
    } catch (error) {
        return { success: false, message: "Erreur serveur" };
    }
}

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    alert(error.message);
});