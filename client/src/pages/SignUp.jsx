import React, { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
import logo from "../assets/logo.webp"; // Ensure this is a large, high-quality image

const Signup = () => {
  const { signup, isSignupUnderProcess } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formValidation = () => {
    if (!formData.name.trim()) return toast.error("Name cannot be blank");
    if (!formData.email.trim()) return toast.error("Email cannot be blank");
    if (!formData.password.trim())
      return toast.error("Password cannot be blank");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      const isSignupSuccess = await signup(formData);
      if (isSignupSuccess) navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 p-6">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-yellow-500 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-yellow-400 font-medium">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-3 mt-2 border border-yellow-400 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-yellow-400 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 mt-2 border border-yellow-400 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-yellow-400 font-medium">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 pr-12 border border-yellow-400 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {/* Show/Hide Password */}
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              disabled={isSignupUnderProcess}
              className="w-full bg-yellow-400 text-black py-3 rounded-xl hover:bg-yellow-500 transition font-semibold text-lg shadow-lg"
            >
              {!isSignupUnderProcess ? "Sign Up" : "Signing Up..."}
            </button>
          </form>

          {/* Already have an account? */}
          <div className="mt-4 text-center">
            <p className="text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-yellow-400 font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* Image Section (Visible only on large screens) */}
        <div className="hidden md:block w-1/2 h-full">
          <img
            src={logo}
            alt="Signup Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
