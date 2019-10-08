import apiClient from "./apiClient";
import { LoginRequestData } from "../interfaces/Auth";

export const login = ( data: LoginRequestData ) => {
  const url: string = 'user/login';
  const response = apiClient.post(url, data);
};