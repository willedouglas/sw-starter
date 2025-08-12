import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { ApiResponse, ApiError } from "@/services/types";

export class BaseService {
  protected client: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL ?? "") {
    this.baseURL = baseURL;

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        const apiError: ApiError = {
          message:
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred.",
          status: error.response?.status || 500,
          code: error.code,
        };
        return Promise.reject(apiError);
      }
    );
  }

  protected async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(endpoint, config);

      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw error as ApiError;
    }
  }

  protected async post<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(endpoint, data, config);

      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw error as ApiError;
    }
  }

  protected async put<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(endpoint, data, config);

      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw error as ApiError;
    }
  }

  protected async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(endpoint, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw error as ApiError;
    }
  }

  protected async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<T>(endpoint, data, config);

      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw error as ApiError;
    }
  }
}
