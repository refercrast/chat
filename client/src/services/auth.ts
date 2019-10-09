import apiClient from "./apiClient";
import { AuthRequestData, AuthResponseData } from "../interfaces/Auth";

export const login = ( data: AuthRequestData ) => {
  const url: string = 'user/login';
  return apiClient.post<AuthResponseData>(url, data);
};

export const register = ( data: AuthRequestData ) => {
  const url: string = 'user/register';
  return apiClient.post<AuthResponseData>(url, data);
};