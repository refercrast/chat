import { apiClient } from "./apiClient";
import { AuthRequestData, AuthResponseData } from "../interfaces";

export const auth = ( data: AuthRequestData ) => {
  const { email, password, path } = data;
  const url: string = `user/${path}`;
  return apiClient.post<AuthResponseData>(url, { email, password });
};