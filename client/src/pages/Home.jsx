import React from "react";
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";

const Home = () => {
  return (
    <div className="h-screen w-screen flex bg-black">
      {/* Sidebar */}
      <div className="w-2/7 border-r border-gray-700">
        <Sidebar />
      </div>

      {/* Chatbox */}
      <div className="w-5/7">
        <Chatbox />
      </div>
    </div>
  );
};

export default Home;
