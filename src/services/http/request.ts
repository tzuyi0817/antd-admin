import axios from 'axios';
import { globalMessage } from '@/providers/message';
import type { RequestMethod } from './types';

const { VITE_API_URL } = import.meta.env;
const axiosInstance = axios.create({ baseURL: VITE_API_URL });

axiosInstance.interceptors.request.use(
  config => {
    const token = '';

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    const { data } = error.response;

    globalMessage.error(data?.message ?? error.message);

    return Promise.reject(error);
  },
);

export const get: RequestMethod = axiosInstance.get;
export const post: RequestMethod = axiosInstance.post;
export const put: RequestMethod = axiosInstance.put;
export const del: RequestMethod = axiosInstance.delete;
