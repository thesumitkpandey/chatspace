import React from "react";
import { useAuthStore } from "../store/authStore";
export default function Profile() {
  const { authUser } = useAuthStore();
  return <div>Profile</div>;
}
