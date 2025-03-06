import { getNotifications, createNotification, deleteNotification } from "./api";

export async function getNotificationsService(userId) {
    const zweezList = await getNotifications(userId);
    return zweezList;
}

export async function createNotificationService(userId, notifierId, type) {
    const zweezList = await createNotification(userId, notifierId, type);
    return zweezList;
}

export async function deleteNotificationService(notificationId) {
    const zweezList = await deleteNotification(notificationId);
    return zweezList;
}