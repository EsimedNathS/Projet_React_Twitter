import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
});

export async function signup(email, password) {
    const response = await axiosInstance.post('register', {
        email: email,
        password: password
    });
    return response.data;
}

export async function login(email, password, username) {
    const response = await axiosInstance.post('login', {
        email: email,
        password: password,
        username: username
    });
    return response.data;
}

export async function verifyToken(token, userId) {
    const response = await axiosInstance.get(`600/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    alert(error.message);
});