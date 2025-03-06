import axios from 'axios'
import store from '../../app/store';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { Authorization: `Bearer ${store.getState().authentification.token}` }
});

export async function addZweez(content, userId, username) {
    try {
      const response = await axiosInstance.post('zweezs', {
        userId: userId,
        username: username,
        content: content,
        time: new Date().toISOString(),
      });

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du Zweez:', error);
      throw error;
    }
}

export async function supZweez(zweezId) {
    try {
      const response = await axiosInstance.delete(`zweezs/${zweezId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression du Zweez:", error);
      throw error;
    }
}

export async function modifZweez(zweezId, userId, username, newContent, time) {
    try {
      const response = await axiosInstance.put(`zweezs/${zweezId}`, {
        userId: userId,
        username: username,
        content: newContent,
        time: time,
      });
  
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la modification du Zweez:", error);
      throw error;
    }
}

export async function getZweezList() {
    const response = await axiosInstance.get('zweezs?_embed=likes');
    return response.data;
}

export async function getZweezListUser(userId) {
    const response = await axiosInstance.get(`zweezs?userId=${userId}&_embed=likes`);
    return response.data;
}

export async function addLikeZweez(userId, zweezId) {
    try {
        const response = await axiosInstance.post(
            "likes",
            { userId, zweezId }
          );
        return { success: true, message: "Like ajouté" };
    } catch (error) {
        return { success: false, message: "Erreur serveur" };
    }
}

export async function supLikeZweez(userId, zweezId) {
    try {
        const response = await axiosInstance.get(`likes?userId=${userId}&zweezId=${zweezId}`);

        if (response.data.length === 0) {
            return { success: false, message: "Like non trouvé" };
        }
        const likeId = response.data[0].id;

        await axiosInstance.delete(`likes/${likeId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return { success: true, message: "Like supprimé" };
    } catch (error) {
        return { success: false, message: "Erreur serveur" };
    }
}
