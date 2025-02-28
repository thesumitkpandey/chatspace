import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authenticatedUser: null,
  isSignupUnderProcess: false,
  isLoginUnderProcess: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkauth");
      set({ authenticatedUser: res.data });
    } catch (error) {
      set({ authenticatedUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  login: async (data) => {
    set({ isLoginUnderProcess: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("Logged in successfully");
      localStorage.setItem("token", res.data.token);
      set({ authenticatedUser: res.data.userDetails });
      return true;
    } catch (error) {
      console.error("Error in login:", error);
      toast.error(error?.response?.data?.message);
      return false;
    } finally {
      set({ isLoginUnderProcess: false });
    }
  },
  signup: async (data) => {
    set({ isSignupUnderProcess: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully, Login to continue");
      return true;
    } catch (error) {
      console.error("Error in signup:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      return false;
    } finally {
      set({ isSignupUnderProcess: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      console.log(data);
      const res = await axiosInstance.put("/auth/updateprofile", data);
      toast.success("Profile updated successfully");
      console.log(res);
      set({ authenticatedUser: res.data });
    } catch (error) {
      console.error("Error in updateProfile:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  logout: async () => {
    try {
      localStorage.removeItem("token");
      set({ authenticatedUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error in logout:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },
}));
