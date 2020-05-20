import axios from 'axios';
import API_ENV from '../config/api.config';

const instance = axios.create({
    baseURL: API_ENV.url,
});

export default instance;