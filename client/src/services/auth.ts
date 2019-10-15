import { apiClient } from "./apiClient";
import { AuthRequestData, AuthResponseData } from "../interfaces";

export const auth = ( data: AuthRequestData ) => {
  const { username, password, path } = data;
  const url: string = `user/${path}`;
  return apiClient.post<AuthResponseData>(url, { username, password });
};