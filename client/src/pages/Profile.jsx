import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import avatar from "../assets/avatar.webp";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

export default function Profile() {
  const { authenticatedUser, updateProfile } = useAuthStore();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      setImage(base64);
      await updateProfile({ profilePicture: base64 });
    };
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-2xl w-full transform transition-all hover:scale-105 duration-300 border border-yellow-400">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <img
              src={authenticatedUser.profilePicture || avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg"
            />
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 bg-yellow-400 text-black rounded-full p-2 cursor-pointer hover:bg-yellow-500 transition duration-300"
            >
              <FaEdit className="h-6 w-6" />
            </label>
            <input
              type="file"
              id="profile-image"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          <div className="w-full">
            <label className="block text-yellow-400 text-sm font-bold mb-2">
              Name
            </label>
            <div className="w-full p-3 bg-gray-800 text-white border border-yellow-400 rounded-lg">
              {authenticatedUser.name}
            </div>
          </div>

          <div className="w-full">
            <label className="block text-yellow-400 text-sm font-bold mb-2">
              Email
            </label>
            <div className="w-full p-3 bg-gray-800 text-white border border-yellow-400 rounded-lg">
              {authenticatedUser.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
