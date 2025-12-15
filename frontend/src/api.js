import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Relative path for Nginx Proxy
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
