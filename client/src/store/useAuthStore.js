import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { BASE_URL } from "../lib/constants.js";
export const useAuthStore = create((set, get) => ({
  authenticatedUser: null,
  isSignupUnderProcess: false,
  isLoginUnderProcess: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],

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
      get().connectSocket();
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
      get().disconnectSocket();
    } catch (error) {
      console.error("Error in logout:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  connectSocket: () => {
    const { authenticatedUser } = get();
    if (!authenticatedUser) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authenticatedUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null }); // Reset socket state
    }
  },
}));
