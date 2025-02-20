import { create } from "zustand";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogginging: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  //START HERE 1;45
}));
