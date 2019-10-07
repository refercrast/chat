import axios from 'axios';

const host: string = 'http://localhost:4000';

export const setToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const call = async (method: string, path: string, data: any) => {
    const response: any = await axios[method](`${host}/${path}`, data);
    return response.data;
};

export default { call, setToken };