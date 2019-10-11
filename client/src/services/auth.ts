import { apiClient, api } from "./apiClient";
import { AuthRequestData, AuthResponseData } from "../interfaces";
import { AxiosResponse } from "axios";

export const auth = ( data: AuthRequestData ) => {
  const { username, password, path } = data;
  const url: string = `user/${path}`;
  // return api.post(url, { username, password });

  return apiClient.post(url, { username, password })
      .then(( response: AxiosResponse<AuthResponseData> ) => ({ response: response.data }))
      .catch(( error )=> ({ error: error.response.data.errorMessage }));
};