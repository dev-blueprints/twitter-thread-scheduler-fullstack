import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, LoginRequest, RegisterRequest } from "../types";
import { authApi } from "../lib/api";
import toast from "react-hot-toast";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (credentials: LoginRequest) => {
        set({ isLoading: true });
        try {
          const response = await authApi.login(credentials);
          const { access_token, user } = response.data;

          localStorage.setItem("access_token", access_token);
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success("Login successful!");
          return true;
        } catch (error: any) {
          const message = error.response?.data?.detail || "Login failed";
          toast.error(message);
          set({ isLoading: false });
          return false;
        }
      },

      register: async (userData: RegisterRequest) => {
        set({ isLoading: true });
        try {
          const response = await authApi.register(userData);
          toast.success("Registration successful! Please login.");
          set({ isLoading: false });
          return true;
        } catch (error: any) {
          const message = error.response?.data?.detail || "Registration failed";
          toast.error(message);
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("access_token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        toast.success("Logged out successfully");
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
