import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  isCheckingAuth: true,
  isAuthenticated: false,
  error: null,

  signup: async ({ username, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post("/auth/signup", {
        name: username,
        email,
        password,
      });
      set({
        error: null,
        isAuthenticated: true,
        user: res.data.newUser,
      });
      toast.success(res.data.message);
    } catch (error) {
      set({ error: error.response.data.message || "Error in signing up" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      set({
        error: null,
        isAuthenticated: true,
        user: res.data.user,
      });
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error in logging in",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post("/auth/verify-email", { code });
      set({
        error: null,
        isAuthenticated: true,
        user: res.data.user,
      });
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error in verifing email",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post("/auth/logout");
      set({ user: null });
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error in logging out",
      });
      throw error;
    } finally {
      set({ isLoading: false, isAuthenticated: false });
    }
  },

  checkAuth: async () => {
    // new Promise((resolve) => setTimeout(resolve, 5000));
    set({ isCheckingAuth: true, error: null });

    try {
      const res = await axios.get("/auth/check-auth");
      set({ user: res.data.user, isAuthenticated: true });
    } catch (error) {
      set({ isAuthenticated: false });
      throw error;
    } finally {
      set({ isCheckingAuth: false, error: null });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post("/auth/forgot-password", { email });
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error in forgot password",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`/auth/reset-password/${token}`, {
        password,
      });
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error in reseting password",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
