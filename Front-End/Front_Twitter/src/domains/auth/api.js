import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
});

export async function signup(email, password, username) {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Username:", username);

    try {
        const response = await axiosInstance.post('/users', {
            email: email,
            password: password,
            username: username
        });

        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur Signup:", error.response?.data || error.message);
        throw error;
    }
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