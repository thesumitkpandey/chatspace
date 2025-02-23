import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useAuthStore } from "../store/useAuthStore.js";
import avatar from "../assets/avatar.webp";
const ProfilePage = () => {
  const { authnticatedUser, isUpdatingProfile, updateProfile } = useAuthStore();
  console.log(authnticatedUser);
  const [name, setName] = useState(authnticatedUser.name);
  const [image, setImage] = useState(avatar);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-2xl w-full transform transition-all hover:scale-105 duration-300 border border-yellow-400">
        <div className="flex flex-col items-center space-y-6">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={image}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg"
            />
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 bg-yellow-400 text-black rounded-full p-2 cursor-pointer hover:bg-yellow-500 transition duration-300"
            >
              <MdModeEditOutline className="h-6 w-6" />{" "}
              {/* React Icon for edit */}
            </label>
            <input
              type="file"
              id="profile-image"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Name */}
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-yellow-400 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
              placeholder="Enter your name"
            />
          </div>

          {/* Email (Non-editable) */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-yellow-400 text-sm font-bold mb-2"
            >
              Email
            </label>
            <div className="w-full p-3 bg-gray-800 text-white border border-yellow-400 rounded-lg">
              {email}
            </div>
          </div>

          {/* Save Button */}
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300 transform hover:scale-105">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
