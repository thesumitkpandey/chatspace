import { useEffect, useState } from "react";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useAuthStore } from "./store/useAuthStore.js";
import { Toaster } from "react-hot-toast";

function App() {
  const { authenticatedUser, isCheckingAuth, checkAuth, onlineUsers } =
    useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  console.log(onlineUsers);
  if (isCheckingAuth && !authenticatedUser) {
    return <div className="w-full h-full bg-amber-400">loading...</div>;
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authenticatedUser ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!authenticatedUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authenticatedUser ? <Profile /> : <Navigate to="/login" />} //
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/signup"
          element={!authenticatedUser ? <SignUp /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
