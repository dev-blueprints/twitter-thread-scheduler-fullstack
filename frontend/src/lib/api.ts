import axios, { AxiosResponse } from "axios";
import {
  User,
  Thread,
  Template,
  CustomTemplate,
  StockData,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  TwitterStatus,
} from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost";

const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (data: LoginRequest): Promise<AxiosResponse<AuthResponse>> =>
    apiClient.post("/auth/login", data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      transformRequest: [
        (data) => {
          const params = new URLSearchParams();
          params.append("email", data.username);
          params.append("password", data.password);
          return params;
        },
      ],
    }),

  register: (data: RegisterRequest): Promise<AxiosResponse<User>> =>
    apiClient.post("/auth/register", data),
};

// Threads API
export const threadsApi = {
  getThreads: (skip = 0, limit = 100): Promise<AxiosResponse<Thread[]>> =>
    apiClient.get("/threads", { params: { skip, limit } }),

  createThread: (data: Partial<Thread>): Promise<AxiosResponse<Thread>> =>
    apiClient.post("/threads", data),

  getThread: (id: number): Promise<AxiosResponse<Thread>> => apiClient.get(`/threads/${id}`),

  updateThread: (id: number, data: Partial<Thread>): Promise<AxiosResponse<Thread>> =>
    apiClient.put(`/threads/${id}`, data),

  publishThread: (id: number): Promise<AxiosResponse<{ message: string; status: string }>> =>
    apiClient.post(`/threads/${id}/publish`),

  deleteThread: (id: number): Promise<AxiosResponse<void>> => apiClient.delete(`/threads/${id}`),
};

// Templates API
export const templatesApi = {
  getTemplates: (category?: string): Promise<AxiosResponse<Template[]>> =>
    apiClient.get("/templates", category ? { params: { category } } : {}),

  getCustomTemplates: (): Promise<AxiosResponse<CustomTemplate[]>> =>
    apiClient.get("/templates/custom"),

  createCustomTemplate: (data: Partial<CustomTemplate>): Promise<AxiosResponse<CustomTemplate>> =>
    apiClient.post("/templates/custom", data),
};

// Finance API
export const financeApi = {
  getStock: (symbol: string): Promise<AxiosResponse<StockData>> =>
    apiClient.get(`/finance/stock/${symbol}`),

  getMultipleStocks: (symbols: string[]): Promise<AxiosResponse<Record<string, StockData>>> =>
    apiClient.post("/finance/stocks", symbols),

  getMarketSummary: (): Promise<AxiosResponse<Record<string, StockData>>> =>
    apiClient.get("/finance/market-summary"),
};

// Twitter API
export const twitterApi = {
  getAuthUrl: (): Promise<AxiosResponse<{ auth_url: string; request_token: string }>> =>
    apiClient.get("/twitter/auth-url"),

  connectTwitter: (
    oauth_token: string,
    oauth_verifier: string
  ): Promise<AxiosResponse<{ message: string; twitter_username: string }>> =>
    apiClient.post("/twitter/connect", { oauth_token, oauth_verifier }),

  disconnectTwitter: (): Promise<AxiosResponse<{ message: string }>> =>
    apiClient.delete("/twitter/disconnect"),

  getTwitterStatus: (): Promise<AxiosResponse<TwitterStatus>> => apiClient.get("/twitter/status"),
};

export default apiClient;
