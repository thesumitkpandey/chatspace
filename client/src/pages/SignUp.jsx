import React, { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const Signup = () => {
  const { signup } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const formValidation = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    return true;
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = formValidation();

    if (success === true) signup(formData);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-black flex w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-2xl h-auto rounded-2xl shadow-2xl overflow-hidden border border-yellow-400 p-8">
        <div className="w-full flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 text-center mb-4">
            Create an Account
          </h2>
          <p className="text-yellow-500 text-center mb-6">
            Sign up to get started!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-yellow-400 font-medium">Name</label>
              <input
                type="text"
                className="w-full p-3 mt-2 border border-yellow-400 rounded-lg bg-black text-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-yellow-400 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 mt-2 border border-yellow-400 rounded-lg bg-black text-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-yellow-400 font-medium">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 pr-12 border border-yellow-400 rounded-lg bg-black text-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
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

            {/* Sign Up Button */}
            <button className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-opacity-80 transition font-semibold text-lg">
              Sign Up
            </button>
          </form>

          {/* Already have an account? */}
          <div className="mt-4 text-center">
            <p className="text-yellow-500">
              Already have an account?
              <Link
                to="/login"
                className="text-yellow-400 font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
