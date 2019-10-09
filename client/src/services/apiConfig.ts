let baseUrl: string = 'http://localhost:4000/';
import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
};

export default config;