import axios, { Axios, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';
import { getTokenStorage } from './app/lib/utils/localStorage';

export const http = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${getTokenStorage()}`,
  },
});

http.interceptors.request.use(
  (req) => {
    req.timeout = 10000;

    if (!req.headers.Authorization) {
      req.headers['Authorization'] = `Bearer ${getTokenStorage()}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (res) => Promise.resolve(res),
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      toast.error('Session Expired, log in again');

      window.location.href = '/';

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
