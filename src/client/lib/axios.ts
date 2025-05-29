/* eslint-disable */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from 'axios';

export type ErrorResponse = {
  message: string;
  code?: string | number;
};

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        try {
          const token =
            typeof window !== 'undefined'
              ? localStorage.getItem('token')
              : null;
          if (token) {
            if (!(config.headers instanceof AxiosHeaders)) {
              config.headers = new AxiosHeaders(config.headers);
            }
            config.headers.set('Authorization', `Bearer ${token}`);
          }
        } catch (e) {
          console.warn('Failed to read token from localStorage', e);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async request<
    Path extends string,
    Method extends 'get' | 'post' | 'put' | 'delete' | 'patch',
    ResponseData = any,
  >(
    method: Method,
    path: Path,
    params?: Record<string, any>,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<ResponseData> {
    try {
      const response = await this.instance.request<ResponseData>({
        method,
        url: path,
        params,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }
}

export const apiClient = new ApiClient();
