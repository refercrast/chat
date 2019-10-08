import apiClient from "./apiClient";

export const login = (data) => {
  const url: string = 'user/login';
  const response = apiClient.post(url, data);
};