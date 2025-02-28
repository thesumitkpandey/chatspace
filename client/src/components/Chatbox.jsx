import React, { useEffect, useRef, useState } from "react";
import useChatStore from "../store/useChatStore";
import { useParams } from "react-router-dom";
import avatar from "../assets/avatar.webp";
import MessageSkeletonLoader from "./skeleton/MessageSkeleton";
import { toast } from "react-hot-toast";

const Chatbox = () => {
  const {
    messages,
    getMessages,
    selectedChat,
    isMessagesLoading,
    sendMessages,
  } = useChatStore();
  const [textInput, setTextInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat._id);
    }
  }, [selectedChat]);

  if (isMessagesLoading) {
    return <MessageSkeletonLoader />;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!textInput.trim() && !imagePreview) return;
    await sendMessages(textInput, imagePreview);
    setTextInput("");
    setImagePreview(null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="h-screen w-full flex flex-col bg-black text-white">
      {/* Chat Header */}
      <div className="p-4 bg-gray-800 text-lg font-semibold flex items-center space-x-3 border-b border-gray-700">
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
              msg.senderId !== selectedChat._id ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block p-2 rounded-lg ${
                msg.senderId !== selectedChat._id
                  ? "bg-yellow-400"
                  : "bg-gray-800"
              }`}
            >
              {msg.image ? (
                <img
                  src={msg.image}
                  alt="Sent Image"
                  className="max-w-xs rounded-lg"
                />
              ) : (
                msg.message
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Image Preview Section */}
      {imagePreview && (
        <div className="p-4 border-t border-gray-700 bg-gray-800 flex items-center justify-between">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 rounded-lg"
          />
          <button
            className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500"
            onClick={() => setImagePreview(null)}
          >
            Remove
          </button>
        </div>
      )}

      {/* Message Input */}
      <form
        onSubmit={handleMessageSubmit}
        className="p-4 flex items-center border-t border-gray-700 bg-gray-900"
      >
        <input
          type="text"
          className="flex-1 p-2 border border-gray-600 rounded-lg bg-black text-white"
          placeholder="Type a message..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />

        {/* Image Upload Button */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <button
          type="button"
          className="ml-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
          onClick={() => fileInputRef.current.click()}
        >
          📷
        </button>

        {/* Send Button */}
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-yellow-400 rounded-lg hover:bg-yellow-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
