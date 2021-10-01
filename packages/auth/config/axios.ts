import { AxiosRequestConfig } from 'axios';
import { AUTH_SERVER_URL } from '../environments';

export const axiosConfig: AxiosRequestConfig = {
  baseURL: AUTH_SERVER_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  }
};
