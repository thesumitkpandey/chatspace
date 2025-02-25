import React from "react";
import Chatbox from "../components/Chatbox.jsx";
import Sidebar from "../components/Sidebar.jsx";
import useChatStore from "../store/useChatStore.js";

const Home = () => {
  const { selectedUser } = useChatStore(); // Check if a chat is selected

  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <Sidebar />

      {/* Chat Container (Hidden on Mobile until a chat is selected) */}
      <div className={`flex-1 ${selectedUser ? "block" : "hidden"} sm:block`}>
        <Chatbox />
      </div>
    </div>
  );
};

export default Home;
