import axios from "axios";
import store from '../../app/store';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { Authorization: `Bearer ${store.getState().authentification.token}` }
});

export async function createNotification(userId, notifierId, type) {
    try {
        const response = await axiosInstance.post("notifications", {
            userId,
            notifierId,
            type,
            time: new Date().toISOString(), // Ajout du timestamp
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création de la notification:", error);
        throw error;
    }
}

export async function getNotifications(userId) {
    try {
        const response = await axiosInstance.get(`notifications?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des notifications:", error);
        throw error;
    }
}

export async function deleteNotification(notificationId) {
    try {
        await axiosInstance.delete(`notifications/${notificationId}`);
        return { success: true, message: "Notification supprimée" };
    } catch (error) {
        console.error("Erreur lors de la suppression de la notification:", error);
        return { success: false, message: "Erreur serveur" };
    }
}
