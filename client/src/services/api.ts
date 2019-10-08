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
    const response: any = await axios[method](`${host}/${path}`, data, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then((response: any) => ({ response: response.data }))
    .catch((error: any) => ({ error: error.response.data } ));
    return response;
};

export default { call, setToken };