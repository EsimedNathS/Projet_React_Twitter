import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
});

export async function getZweezList(token) {
    const response = await axiosInstance.get('zweez', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}