import React, { useEffect, useState } from "react";
import useChatStore from "../store/useChatStore";
import { useParams } from "react-router-dom";
import avatar from "../assets/avatar.webp";

const Chatbox = () => {
  const { messages, getMessages, selectedChat, setSelectedChat } =
    useChatStore();
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (id) {
      getMessages(id);
      setSelectedChat({ _id: id }); // Ensure chat is set
    }
  }, [id]);

  return (
    <div className="h-full flex flex-col bg-black text-white">
      {/* Chat Header */}
      <div className="p-4 bg-gray-900 text-lg font-semibold flex items-center space-x-3 border-b border-gray-700">
        <img
          src={selectedChat?.profilePicture || avatar}
          alt="Receiver"
          className="w-10 h-10 rounded-full border border-gray-500"
        />
        <span>{selectedChat?.name || "Chat"}</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "You" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block p-2 rounded-lg ${
                msg.sender === "You" ? "bg-gray-800" : "bg-gray-900"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 flex border-t border-gray-700 bg-gray-900">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-600 rounded-lg bg-black text-white"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="ml-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
