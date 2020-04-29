import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.fabricio7p.com.br'
});

export default api;
