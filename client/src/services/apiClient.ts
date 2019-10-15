import axios from 'axios';
import config from "./apiConfig";

export const apiClient = axios.create(config);
