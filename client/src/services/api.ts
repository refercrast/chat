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
    // @ts-ignore
    // const response: any = await axios[method](`${host}/${path}`, data);
    const response: any = axios.post(`${host}/${path}`, {
        username: 'api',
        password: 'MY_PASSWORD',
        grant_type: 'MY_GRANT_TYPE'
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
    return response.data;
};

export default { call, setToken };