import axios from 'axios';
import config from "./apiConfig";

export const apiClient = axios.create(config);

const post = (url: string, data: any ) => {
   return apiClient.post(url, data)
       .then(response => ({ response: response.data }))
       .catch(error => ({ error: error.response.data.errorMessage }));
};

export const api = ({
    post
});
