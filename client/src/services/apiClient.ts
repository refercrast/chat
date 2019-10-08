import axios from 'axios';
import config from "./apiConfig";

const apiClient = () => axios.create(config);

export default apiClient();