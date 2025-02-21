import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
export const useAuthStore = create((set) => ({
  LoggedInUser: null,
  isSignupUnderProcess: false,
  isLoginUnderProcess: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkauth");
      set({ authenticatedUser: res.data });
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authenticatedUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  login: async (data) => {},
  signup: async (data) => {},
  logout: () => {},
}));
