import { AxiosRequestConfig } from 'axios';

let baseUrl: string = 'http://localhost:4000/';

const config: AxiosRequestConfig = {
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
};

export default config;