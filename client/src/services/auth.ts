import { apiClient } from "./apiClient";
import { AuthRequestData, AuthResponseData } from "../interfaces";

export const login = ( data: AuthRequestData ) => {
  const url: string = 'user/login';
  return apiClient.post(url, data)
      .then(response => ({ response: response.data }))
      .catch(error => ({ error: error.response.data.errorMessage }));
};

// export const register = ( data: AuthRequestData ) => {
//   const url: string = 'user/register';
//   return apiClient.post<AuthResponseData>(url, data);
// };