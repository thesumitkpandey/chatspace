import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { create } from "zustand";

const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedChat: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data.users });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error("Error in getUsers:", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (id) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${id}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error("Error in getMessages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedChat: (user) => {
    set({ selectedChat: user });
  },
}));
export default useChatStore;
