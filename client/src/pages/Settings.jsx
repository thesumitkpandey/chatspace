import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
export default function settings() {
  const { authenticatedUser } = useAuthStore();
  console.log(authenticatedUser);

  return <div>settings</div>;
}
