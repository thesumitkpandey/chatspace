import React, { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import loginImage from "../assets/logo.webp";

const Login = () => {
  const { isLoginUnderProcess, login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 p-6">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-yellow-500 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Image Section (Large Screens) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          {/* Title */}
          <h2 className="text-4xl font-bold text-yellow-400 text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Log in to continue your fun!
          </p>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
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

                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoginUnderProcess}
              className="w-full bg-yellow-400 text-black py-3 rounded-xl hover:bg-yellow-500 transition font-semibold text-lg shadow-lg"
            >
              {isLoginUnderProcess ? "Logging In..." : "Log In"}
            </button>
          </form>

          {/* Forgot Password & Sign Up */}
          <div className="mt-4 text-center">
            <p className="text-gray-300">
              Forgot your password?{" "}
              <Link
                to="/reset-password"
                className="text-yellow-400 font-medium hover:underline"
              >
                Reset it
              </Link>
            </p>
            <p className="text-gray-300 mt-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-yellow-400 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
