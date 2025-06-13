import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../assets/login.png";
import Email from "../assets/email.png";
import Lock from "../assets/lock.png";
import axiosInstance from "../config/axiosConfig";
import toast from "react-hot-toast";
import Logo from "../assets/valenciago-white.png";
import Footer from "./Footer";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/login", formData)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.message);
      });
  };

  return (
    <>
      <div className=" relative h-[80px] bg-[#141414] flex items-center justify-center mb-[-50px] z-10">
        <img className=" h-10 " src={Logo} alt="" />
      </div>
      <div className=" relative min-h-screen flex items-center justify-center p-3 bg-img z-0 ">
        {/* SignIn Card */}
        <div className="relative z-10 w-full max-w-xs sm:max-w-sm card ">
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-4 sm:p-6 relative overflow-hidden"
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-xl"></div>

            <div className="relative z-10">
              {/* Header Section */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-3 sm:mb-4 shadow-lg">
                  <img
                    className="w-5 h-5 sm:w-6 sm:h-6 filter brightness-0 invert"
                    src={LoginImg}
                    alt="login logo"
                  />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                  Welcome!
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Sign in to continue your shopping journey
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5">
                {/* Email Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img
                      className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                      src={Email}
                      alt="email icon"
                    />
                  </div>
                  <input
                    className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm bg-gray-50/80 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:bg-gray-50"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img
                      className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                      src={Lock}
                      alt="lock icon"
                    />
                  </div>
                  <input
                    className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm bg-gray-50/80 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:bg-gray-50"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="w-4 h-4 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-[12px] sm:text-sm text-black hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                className="w-full cursor-pointer bg-black text-white font-bold py-3 px-5 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200 shadow-lg"
                type="submit"
              >
                Get Started
              </button>

              {/* Benefits */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  ✓ Secure checkout ✓ Order tracking ✓ Exclusive deals
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-400"></div>
                <span className="mx-3 text-gray-500 text-sm font-medium bg-white px-2">
                  New customer?
                </span>
                <div className="flex-1 border-t border-gray-400"></div>
              </div>

              {/* Sign Up Button */}
              <Link to="/signUp" className="block w-full">
                <button
                  className="w-full cursor-pointer bg-white text-black font-bold py-3 px-5 rounded-lg border-2 border-black hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200"
                  type="button"
                >
                  Sign Up
                </button>
              </Link>

              {/* Trust indicators */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  Trusted by 50,000+ customers worldwide
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
