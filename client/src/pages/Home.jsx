import React from "react";
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";

const Home = () => {
  return (
    <div className="h-screen w-screen flex bg-black">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-700">
        <Sidebar />
      </div>

      {/* Chatbox */}
      <div className="w-3/4">
        <Chatbox />
      </div>
    </div>
  );
};

export default Home;
