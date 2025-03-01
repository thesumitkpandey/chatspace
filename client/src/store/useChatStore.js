import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
const useChatStore = create((set, get) => ({
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
  sendMessages: async (message, image) => {
    const { selectedChat, messages } = get();

    try {
      const messageOrImage = {
        message,
        image, // This will contain the Base64 string (if available)
      };

      const res = await axiosInstance.post(
        `/message/${selectedChat._id}`,
        messageOrImage
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error("Failed to send message");
    }
  },
  subscribeToMessage: () => {
    const { selectedChat } = get();
    if (!selectedChat) return;

    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        set((state) => ({ messages: [...state.messages, newMessage] })); // Fixed state update
      });
    }
  },
  unsubscribeToMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage"); // Removed the event listener
  },
}));
export default useChatStore;
