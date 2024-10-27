import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : 'http://127.0.0.1:8000'
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

