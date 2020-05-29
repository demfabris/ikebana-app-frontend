import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.fabricio7p.com.br'
    //dev
    // baseURL: 'http://192.168.1.77:5000'
});

export default api;
