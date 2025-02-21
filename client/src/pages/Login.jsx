import React, { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { isLoginUnderProcess, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-black flex w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-2xl h-auto rounded-2xl shadow-2xl overflow-hidden border border-yellow-400 p-8">
        <div className="w-full flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 text-center mb-4">
            Welcome Back
          </h2>
          <p className="text-yellow-500 text-center mb-6">
            Log In to continue your fun!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-yellow-400 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 mt-2 border border-yellow-400 rounded-lg bg-black text-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="Name@Example.com"
                value={formData.email}
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            {/* Password with Show/Hide Toggle */}
            <div className="relative">
              <label className="block text-yellow-400 font-medium">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 pr-12 border border-yellow-400 rounded-lg bg-black text-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="Password"
                  value={formData.password}
                  minLength="6"
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
                {/* Eye Icon (Adjusted Properly) */}
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
              className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-opacity-80 transition font-semibold text-lg"
            >
              {isLoginUnderProcess ? "Logging In..." : "Log In"}
            </button>
          </form>

          {/* Forgot Password & Sign Up */}
          <div className="mt-4 text-center">
            <p className="text-yellow-500">
              Forgot your password?{" "}
              <Link
                to="/reset-password"
                className="text-yellow-400 font-medium hover:underline"
              >
                Reset it
              </Link>
            </p>
            <p className="text-yellow-500 mt-2">
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
