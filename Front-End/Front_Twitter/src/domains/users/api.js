import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
});

export async function getFollower(token, userId) {
    const response = await axiosInstance.post('register', {
        email: email,
        password: password
    });
    return response.data;
}

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    alert(error.message);
});