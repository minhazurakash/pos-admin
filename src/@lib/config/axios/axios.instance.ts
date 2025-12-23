import { ENV } from '.environments';
import { IBaseResponse } from '@base/interfaces';
import { authPaths } from '@lib/constant/paths';
import { cookies } from '@lib/utils/cookies';
import { authRefreshToken } from '@modules/auth/lib/refresh-token';
import { notification } from 'antd';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// const headers = {
//   Authorization: `Bearer ${getAuthToken()}`,
// };
export const AxiosInstance = axios.create({
  timeout: 10000,
  baseURL: ENV.apiUrl,
  // headers,
});
AxiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.headers['Authorization'] = `Bearer ${await authRefreshToken()}`;
    config.headers['time-zone-offset'] = -new Date().getTimezoneOffset();
    config.headers['access-by-token'] = cookies.getData('accessToken') ?? null;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
AxiosInstance.interceptors.response.use(
  (response: AxiosResponse<IBaseResponse>) => {
    return response;
  },
  async (error: AxiosError<IBaseResponse>) => {
    if (error?.response?.status === 401) {
      if (typeof window === 'undefined') return error.response;
      if (authPaths.includes(window.location.pathname)) return error.response;
      // if (ENV.isProduction) await AuthService.logout();
      return error.response;
    } else if (error.response?.data?.success === false) {
      error.response?.data?.errorMessages?.map((x: string) => {
        return notification.error({
          message: x,
          duration: 2,
        });
      });
    }
    return error.response;
  },
);
