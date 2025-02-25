// Chatbox.jsx
import React from "react";

const Chatbox = ({ selectedUser, closeChat }) => {
  if (!selectedUser) return null; // No user selected

  return (
    <div className="w-full sm:w-2/3 h-screen bg-gray-800 text-white p-4 relative">
      <div className="flex items-center justify-between border-b border-gray-700 pb-2">
        <h2 className="text-xl">{selectedUser.name}</h2>
        <button className="sm:hidden text-red-400" onClick={closeChat}>
          Close
        </button>
      </div>
      <div className="mt-4">Chat with {selectedUser.name}...</div>
    </div>
  );
};

export default Chatbox;
