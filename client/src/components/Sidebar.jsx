import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import avatar from "../assets/avatar.webp";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { users, getUsers, setSelectedChat } = useChatStore();
  const navigate = useNavigate();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="h-full bg-black text-white p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold">Chats</h2>
      <div className="mt-4 space-y-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedChat(user);
            }}
            className="flex items-center p-3 border border-gray-700 cursor-pointer rounded-lg transition-all duration-200 hover:bg-gray-800 w-full text-left"
          >
            <img
              src={user.profilePicture || avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3 flex-1">
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            <span
              className={`text-sm ${
                onlineUsers.includes(user._id)
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {onlineUsers.includes(user._id) ? "Online" : "Offline"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
