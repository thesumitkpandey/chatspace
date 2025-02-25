import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import avatar from "../assets/avatar.webp";

const Sidebar = () => {
  const { isUsersLoading, getUsers, users, selectedChat, setSelectedChat } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, []);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <div className="w-full sm:w-1/3 bg-black h-screen text-white p-4">
      <h2 className="text-xl font-semibold">Chats</h2>
      <div className="mt-4 space-y-3">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedChat(user._id)}
            className={`flex items-center p-3 border border-gray-700 cursor-pointer rounded-lg transition-all duration-200 ${
              selectedChat === user._id
                ? "bg-gray-700 border-white scale-105 shadow-md shadow-gray-500"
                : "hover:bg-gray-800"
            }`}
          >
            {/* Profile Picture */}
            <img
              src={user.profilePicture || avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />

            {/* User Name & Status */}
            <div className="ml-3 flex-1">
              <p className="text-lg font-medium">{user.name}</p>
              <p
                className={`text-sm ${
                  user.isOnline ? "text-green-400" : "text-red-400"
                }`}
              >
                {user.isOnline ? "Online" : "Offline"}
              </p>
            </div>

            {/* Online/Offline Indicator */}
            <div
              className={`w-3 h-3 rounded-full ${
                user.isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
